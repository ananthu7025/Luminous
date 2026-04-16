/**
 * Clear Script: Delete all case studies from CRM
 * Run with: npx tsx scripts/clear-case-studies.ts
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

async function fetchAllCaseStudies() {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/case-studies?limit=1000`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error fetching case studies: ${response.status} - ${error}`);
      return [];
    }

    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

async function deleteCaseStudy(id: string) {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/case-studies/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error deleting case study ${id}: ${response.status} - ${error}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error deleting case study ${id}:`, error);
    return false;
  }
}

async function clearCaseStudies() {
  console.log('🗑️  Starting case studies deletion...');
  console.log(`API Base: ${CRM_API_BASE}\n`);

  if (!SEED_API_KEY) {
    console.error('❌ Error: SEED_API_KEY not set. Add it to .env.local');
    process.exit(1);
  }

  console.log('📥 Fetching all case studies...');
  const caseStudies = await fetchAllCaseStudies();
  console.log(`Found ${caseStudies.length} case studies\n`);

  if (caseStudies.length === 0) {
    console.log('✓ No case studies to delete');
    process.exit(0);
  }

  console.log('🔄 Deleting case studies...');
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < caseStudies.length; i++) {
    const caseStudy = caseStudies[i];
    const success = await deleteCaseStudy(caseStudy.id);

    if (success) {
      successCount++;
      console.log(`  ✓ [${i + 1}/${caseStudies.length}] Deleted: ${caseStudy.title}`);
    } else {
      failureCount++;
      console.log(`  ✗ [${i + 1}/${caseStudies.length}] Failed: ${caseStudy.title}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Summary:');
  console.log(`✓ Deleted: ${successCount}`);
  console.log(`✗ Failed: ${failureCount}`);
  console.log(`Total: ${caseStudies.length}`);

  if (failureCount === 0) {
    console.log('\n✅ All case studies deleted successfully!');
  } else {
    console.log(`\n⚠️  ${failureCount} case studies failed to delete`);
  }
}

clearCaseStudies().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
