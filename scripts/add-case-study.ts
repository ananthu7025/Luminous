/**
 * Manual Case Study Upload Script
 * Run with: npx tsx scripts/add-case-study.ts
 *
 * Allows you to manually add case studies one at a time
 * and debug any issues with individual uploads
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

const CRM_API_BASE = process.env.NEXT_PUBLIC_CRM_API_BASE || 'https://luminoustracker.luminouslogics.com';
const SEED_API_KEY = process.env.SEED_API_KEY;
const PORTFOLIO_DIR = path.join(process.cwd(), 'src/data/luminous/portfolio');

// Case studies to upload
const CASE_STUDIES = [
  'al-sabah-hvac.md',
  'ncamadeeasy-lms.md',
  'spicemagic.md',
  'stmaries-construction.md',
  'tripledge.md',
];

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

async function uploadCaseStudy(filePath: string, filename: string) {
  console.log(`\n📤 Uploading: ${filename}`);

  const caseStudyData = readMarkdownFile(filePath);

  // Validate required fields
  if (!caseStudyData.title) {
    console.error('❌ Missing title');
    return false;
  }

  // Generate slug from filename if not provided
  let slug = caseStudyData.slug;
  if (!slug) {
    slug = filename.replace('.md', '').toLowerCase().replace(/\s+/g, '-');
  }
  // Add timestamp to ensure uniqueness (previous attempts may have created duplicates)
  slug = `${slug}-${Date.now()}`;

  console.log(`  Title: ${caseStudyData.title}`);
  console.log(`  Slug: ${slug}`);
  console.log(`  Industry: ${caseStudyData.industry || 'N/A'}`);

  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    // Extract only simple string fields (exclude content to avoid database issues)
    const payload = {
      title: String(caseStudyData.title || '').trim(),
      slug: String(slug || '').trim(),
      thumbnail: caseStudyData.thumbnail ? String(caseStudyData.thumbnail).trim() : null,
      industry: caseStudyData.industry ? String(caseStudyData.industry).trim() : null,
      stack: caseStudyData.stack ? String(caseStudyData.stack).trim() : null,
      description: caseStudyData.description ? String(caseStudyData.description).trim() : null,
      published: true,
    };

    console.log(`  Sending to: ${CRM_API_BASE}/api/case-studies`);

    const response = await fetch(`${CRM_API_BASE}/api/case-studies`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`❌ Error (${response.status}): ${responseText}`);
      return false;
    }

    const result = await response.json();
    console.log(`✅ Success! ID: ${result.id}`);
    return true;
  } catch (error) {
    console.error(`❌ Upload failed:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Manual Case Study Upload Script');
  console.log(`API Base: ${CRM_API_BASE}`);

  if (!SEED_API_KEY) {
    console.warn('⚠️  SEED_API_KEY not set. Add it to .env.local');
    return;
  }

  console.log('✓ Using SEED_API_KEY from environment');
  console.log(`\nFound ${CASE_STUDIES.length} case studies to upload:\n`);

  CASE_STUDIES.forEach((file, i) => {
    console.log(`${i + 1}. ${file}`);
  });

  console.log('\nStarting upload...');

  let successCount = 0;
  let failureCount = 0;

  for (const filename of CASE_STUDIES) {
    const filePath = path.join(PORTFOLIO_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      failureCount++;
      continue;
    }

    const success = await uploadCaseStudy(filePath, filename);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }

    // Small delay between uploads to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Upload Summary');
  console.log('='.repeat(50));
  console.log(`✅ Success: ${successCount}/${CASE_STUDIES.length}`);
  console.log(`❌ Failed: ${failureCount}/${CASE_STUDIES.length}`);

  if (failureCount === 0) {
    console.log('\n🎉 All case studies uploaded successfully!');
  } else {
    console.log('\n⚠️  Some uploads failed. Check the errors above.');
  }
}

main().catch(console.error);
