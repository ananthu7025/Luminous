/**
 * Clear Script: Delete all testimonials from CRM
 * Run with: npx tsx scripts/clear-testimonials.ts
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

async function fetchAllTestimonials() {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/testimonials?limit=1000`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error fetching testimonials: ${response.status} - ${error}`);
      return [];
    }

    const data = await response.json();
    return data.testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

async function deleteTestimonial(id: string) {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/testimonials/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error deleting testimonial ${id}: ${response.status} - ${error}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error deleting testimonial ${id}:`, error);
    return false;
  }
}

async function clearTestimonials() {
  console.log('🗑️  Starting testimonials deletion...');
  console.log(`API Base: ${CRM_API_BASE}\n`);

  if (!SEED_API_KEY) {
    console.error('❌ Error: SEED_API_KEY not set. Add it to .env.local');
    process.exit(1);
  }

  console.log('📥 Fetching all testimonials...');
  const testimonials = await fetchAllTestimonials();
  console.log(`Found ${testimonials.length} testimonials\n`);

  if (testimonials.length === 0) {
    console.log('✓ No testimonials to delete');
    process.exit(0);
  }

  console.log('🔄 Deleting testimonials...');
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    const success = await deleteTestimonial(testimonial.id);

    if (success) {
      successCount++;
      console.log(`  ✓ [${i + 1}/${testimonials.length}] Deleted: ${testimonial.name}`);
    } else {
      failureCount++;
      console.log(`  ✗ [${i + 1}/${testimonials.length}] Failed: ${testimonial.name}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Summary:');
  console.log(`✓ Deleted: ${successCount}`);
  console.log(`✗ Failed: ${failureCount}`);
  console.log(`Total: ${testimonials.length}`);

  if (failureCount === 0) {
    console.log('\n✅ All testimonials deleted successfully!');
  } else {
    console.log(`\n⚠️  ${failureCount} testimonials failed to delete`);
  }
}

clearTestimonials().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
