/**
 * Seed Script: Migrate hardcoded data from Luminous website to CRM APIs
 * Run with: npx tsx scripts/seed-cms-data.ts
 *
 * This script:
 * 1. Extracts blog posts from markdown files
 * 2. Extracts case studies from markdown files
 * 3. Extracts testimonials from hardcoded data
 * 4. Uploads all data to the CRM via API endpoints
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const CRM_API_BASE = process.env.NEXT_PUBLIC_CRM_API_BASE || process.env.CRM_API_BASE || 'https://luminoustracker.luminouslogics.com';
const SEED_API_KEY = process.env.SEED_API_KEY;
const BLOGS_DIR = path.join(process.cwd(), 'src/data/blogs');
const PORTFOLIO_DIR = path.join(process.cwd(), 'src/data/luminous/portfolio');

// Testimonials data from Testimonial.tsx
const testimonials = [
  {
    name: 'Al Sabah HVAC Solutions',
    company: 'International HVAC Operations — Kuwait & Canada',
    avatar: '/images/luminous-assets/alsabhalogo.svg',
    testimonial:
      'The digital solution Luminous Logics built for us directly supported our international expansion vision. Professional, reliable, and they truly understood our requirements from day one.',
    active: true,
    displayOrder: 0,
  },
  {
    name: 'NCAMadeEasy',
    company: 'LMS & Learning Platform — India',
    avatar: '/images/luminous-assets/ncalogo.avif',
    testimonial:
      'The LMS platform Luminous built was a true game-changer for our exam preparation platform. Fast delivery, clean design, and exactly what we envisioned — highly recommend.',
    active: true,
    displayOrder: 1,
  },
  {
    name: 'SpiceMagic',
    company: 'E-commerce & Retail Platform',
    avatar: '/images/luminous-assets/spicemagiclogo.webp',
    testimonial:
      'The SpiceMagic e-commerce platform has been a total success. The design is beautiful and the shopping experience is flawless. Highly recommend Luminous Logics!',
    active: true,
    displayOrder: 2,
  },
  {
    name: "St. Mary's",
    company: 'Landscaping & Construction Services',
    avatar: '/images/luminous-assets/stmarieslogo.webp',
    testimonial:
      "Our new website as Saskatoon's best landscaping team has really helped us grow. Luminous captured our vision perfectly and delivered a premium result.",
    active: true,
    displayOrder: 3,
  },
];

// Read markdown files and extract frontmatter
function readMarkdownFile(filePath: string): Record<string, any> {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      ...data,
      content,
    } as Record<string, any>;
  } catch (error) {
    console.error(`Failed to read file ${filePath}:`, error);
    return { content: '' };
  }
}

// Get all markdown files from a directory
function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(dir, file));
}

// Upload data via API
async function uploadToAPI(endpoint: string, data: any) {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    // Add API key if available
    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      try {
        const error = await response.text();
        console.error(`Error uploading to ${endpoint}: ${response.status} - ${error}`);
      } catch {
        console.error(`Error uploading to ${endpoint}: ${response.status}`);
      }
      return false;
    }

    const result = await response.json();
    console.log(`✓ Uploaded to ${endpoint}:`, result.id || result.slug);
    return true;
  } catch (error) {
    console.error(`Error uploading to ${endpoint}:`, error);
    return false;
  }
}

// Main seed function
async function seedData() {
  console.log('🌱 Starting CMS data seed...');
  console.log(`API Base: ${CRM_API_BASE}`);

  if (!SEED_API_KEY) {
    console.warn('⚠️  Warning: SEED_API_KEY not set. Add it to .env.local:');
    console.warn('SEED_API_KEY=<your-secret-key>');
    console.warn('Without it, seed uploads may fail.\n');
  } else {
    console.log('✓ Using SEED_API_KEY from environment\n');
  }

  let successCount = 0;
  let failureCount = 0;

  // 1. Upload Testimonials
  console.log('📝 Seeding Testimonials...');
  for (const testimonial of testimonials) {
    const success = await uploadToAPI('testimonials', testimonial);
    success ? successCount++ : failureCount++;
  }
  console.log(`Testimonials: ${testimonials.length} uploaded\n`);

  // 2. Upload Blog Posts
  console.log('📚 Seeding Blog Posts...');
  const blogFiles = getMarkdownFiles(BLOGS_DIR);
  let blogSuccessCount = 0;
  for (const filePath of blogFiles) {
    const blogData = readMarkdownFile(filePath);

    // Skip if missing title (required)
    if (!blogData.title) {
      console.warn(`⚠️  Skipping ${path.basename(filePath)}: Missing title`);
      failureCount++;
      continue;
    }

    // Generate slug from filename if not provided
    let slug = blogData.slug;
    if (!slug) {
      const filename = path.basename(filePath, '.md');
      slug = filename.toLowerCase().replace(/\s+/g, '-');
    }

    // Parse readTime - it comes as a string like "8 min read"
    let readTimeNum = 5;
    if (blogData.readTime) {
      const match = String(blogData.readTime).match(/(\d+)/);
      readTimeNum = match ? parseInt(match[1]) : 5;
    }

    const payload = {
      title: blogData.title,
      slug: slug,
      publishDate: blogData.publishDate || null,
      thumbnail: blogData.thumbnail || null,
      tag: blogData.tag || null,
      author: blogData.author || null,
      readTime: readTimeNum,
      description: blogData.description || null,
      content: blogData.content || '',
      published: true,
    };

    const success = await uploadToAPI('blog', payload);
    if (success) {
      successCount++;
      blogSuccessCount++;
    } else {
      failureCount++;
    }
  }
  console.log(`Blog Posts: ${blogSuccessCount}/${blogFiles.length} uploaded\n`);

  // 3. Upload Case Studies
  console.log('💼 Seeding Case Studies...');
  const portfolioFiles = getMarkdownFiles(PORTFOLIO_DIR);
  let caseStudySuccessCount = 0;
  for (const filePath of portfolioFiles) {
    const caseStudyData = readMarkdownFile(filePath);

    // Skip if missing title (required)
    if (!caseStudyData.title) {
      console.warn(`⚠️  Skipping ${path.basename(filePath)}: Missing title`);
      failureCount++;
      continue;
    }

    // Generate slug from filename if not provided
    let csSlug = caseStudyData.slug;
    if (!csSlug) {
      const filename = path.basename(filePath, '.md');
      csSlug = filename.toLowerCase().replace(/\s+/g, '-');
    }

    // Extract only simple string fields (exclude content to avoid database issues)
    const payload = {
      title: String(caseStudyData.title || '').trim(),
      slug: String(csSlug || '').trim(),
      thumbnail: caseStudyData.thumbnail ? String(caseStudyData.thumbnail).trim() : null,
      industry: caseStudyData.industry ? String(caseStudyData.industry).trim() : null,
      stack: caseStudyData.stack ? String(caseStudyData.stack).trim() : null,
      description: caseStudyData.description ? String(caseStudyData.description).trim() : null,
      published: true,
    };

    const success = await uploadToAPI('case-studies', payload);
    if (success) {
      successCount++;
      caseStudySuccessCount++;
    } else {
      failureCount++;
    }
  }
  console.log(`Case Studies: ${caseStudySuccessCount}/${portfolioFiles.length} uploaded\n`);

  // Summary
  console.log('✨ Seed Complete!');
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failureCount}`);
  console.log(`\nNext steps:`);
  console.log(`1. Verify data in CRM at: ${CRM_API_BASE}`);
  console.log(`2. Update your frontend components to use the APIs`);
  console.log(`3. Remove hardcoded data from your components`);
}

// Run seed
seedData().catch(console.error);
