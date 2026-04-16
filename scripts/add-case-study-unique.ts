/**
 * Manual Case Study Upload - With Unique Slugs
 * Adds timestamp to slugs to ensure uniqueness
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

// Load environment variables
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
  const caseStudyData = readMarkdownFile(filePath);

  if (!caseStudyData.title) {
    console.warn(`⚠️  ${filename}: Missing title`);
    return false;
  }

  let slug = caseStudyData.slug;
  if (!slug) {
    slug = filename.replace('.md', '').toLowerCase().replace(/\s+/g, '-');
  }

  try {
    const payload = {
      title: String(caseStudyData.title || '').trim(),
      slug: String(slug || '').trim(),
      thumbnail: caseStudyData.thumbnail ? String(caseStudyData.thumbnail).trim() : null,
      industry: caseStudyData.industry ? String(caseStudyData.industry).trim() : null,
      stack: caseStudyData.stack ? String(caseStudyData.stack).trim() : null,
      description: caseStudyData.description ? String(caseStudyData.description).trim() : null,
      content: String(caseStudyData.content || '').trim(),
      published: true,
    };

    console.log(`📤 ${filename.padEnd(25)} → ${payload.title.substring(0, 30)}`);

    const response = await fetch(`${CRM_API_BASE}/api/case-studies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': SEED_API_KEY || '',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.log(`   ❌ ${response.status}: ${text.substring(0, 100)}`);

      // If it's a unique constraint error, try with timestamp
      if (response.status === 400 && text.includes('unique')) {
        console.log(`   🔄 Retrying with unique slug...`);
        payload.slug = `${slug}-${Date.now()}`;

        const retryResponse = await fetch(`${CRM_API_BASE}/api/case-studies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': SEED_API_KEY || '',
          },
          body: JSON.stringify(payload),
        });

        if (retryResponse.ok) {
          console.log(`   ✅ Success with unique slug!`);
          return true;
        }
      }
      return false;
    }

    const result = await response.json();
    console.log(`   ✅ Success`);
    return true;
  } catch (error) {
    console.error(`   ❌ ${error}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Case Study Upload (Retry)');
  console.log(`API: ${CRM_API_BASE}\n`);

  const files = [
    'al-sabah-hvac.md',
    'ncamadeeasy-lms.md',
    'spicemagic.md',
    'stmaries-construction.md',
    'tripledge.md',
  ];

  let successCount = 0;
  for (const filename of files) {
    const filePath = path.join(PORTFOLIO_DIR, filename);
    if (fs.existsSync(filePath)) {
      const success = await uploadCaseStudy(filePath, filename);
      if (success) successCount++;
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log(`\n✅ Uploaded: ${successCount}/${files.length}`);
}

main().catch(console.error);
