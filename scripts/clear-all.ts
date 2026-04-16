/**
 * Clear All Script: Delete all CMS data from CRM
 * Run with: npx tsx scripts/clear-all.ts
 *
 * This script:
 * 1. Deletes all blog posts
 * 2. Deletes all testimonials
 * 3. Deletes all case studies
 */

import * as fs from 'fs';
import * as path from 'path';

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

async function fetchAndDelete(endpoint: string, dataKey: string, nameField: string) {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    // Fetch all items
    const fetchResponse = await fetch(`${CRM_API_BASE}/api/${endpoint}?limit=1000`, {
      method: 'GET',
      headers,
    });

    if (!fetchResponse.ok) {
      console.error(`✗ Failed to fetch ${endpoint}`);
      return { success: 0, failed: 0, total: 0 };
    }

    const data = await fetchResponse.json();
    const items = data[dataKey] || [];

    if (items.length === 0) {
      console.log(`  ℹ️  No ${endpoint} to delete`);
      return { success: 0, failed: 0, total: 0 };
    }

    console.log(`  🔄 Deleting ${items.length} ${endpoint}...`);

    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      try {
        const deleteResponse = await fetch(`${CRM_API_BASE}/api/${endpoint}/${item.id}`, {
          method: 'DELETE',
          headers,
        });

        if (deleteResponse.ok) {
          successCount++;
          console.log(`    ✓ [${i + 1}/${items.length}] ${item[nameField]}`);
        } else {
          failureCount++;
          console.log(`    ✗ [${i + 1}/${items.length}] ${item[nameField]}`);
        }
      } catch (error) {
        failureCount++;
        console.log(`    ✗ [${i + 1}/${items.length}] ${item[nameField]}`);
      }

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    return { success: successCount, failed: failureCount, total: items.length };
  } catch (error) {
    console.error(`✗ Error processing ${endpoint}:`, error);
    return { success: 0, failed: 0, total: 0 };
  }
}

async function clearAll() {
  console.log('🗑️  Starting complete data deletion...');
  console.log(`API Base: ${CRM_API_BASE}\n`);

  if (!SEED_API_KEY) {
    console.error('❌ Error: SEED_API_KEY not set. Add it to .env.local');
    process.exit(1);
  }

  const results: any = {};

  console.log('📝 Processing Blogs...');
  results.blogs = await fetchAndDelete('blog', 'blogs', 'title');

  console.log('\n💬 Processing Testimonials...');
  results.testimonials = await fetchAndDelete('testimonials', 'testimonials', 'name');

  console.log('\n💼 Processing Case Studies...');
  results.caseStudies = await fetchAndDelete('case-studies', 'projects', 'title');

  // Summary
  console.log('\n\n📊 Final Summary:');
  console.log('═'.repeat(50));

  const totalSuccess = results.blogs.success + results.testimonials.success + results.caseStudies.success;
  const totalFailed = results.blogs.failed + results.testimonials.failed + results.caseStudies.failed;
  const grandTotal = totalSuccess + totalFailed;

  console.log(`Blogs:         ✓ ${results.blogs.success}/${results.blogs.total} deleted`);
  console.log(`Testimonials:  ✓ ${results.testimonials.success}/${results.testimonials.total} deleted`);
  console.log(`Case Studies:  ✓ ${results.caseStudies.success}/${results.caseStudies.total} deleted`);
  console.log('═'.repeat(50));
  console.log(`Total:         ✓ ${totalSuccess}/${grandTotal} deleted`);

  if (totalFailed === 0) {
    console.log('\n✅ All data deleted successfully!');
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${totalFailed} items failed to delete`);
    process.exit(1);
  }
}

clearAll().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
