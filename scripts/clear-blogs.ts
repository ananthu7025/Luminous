/**
 * Clear Script: Delete all blog posts from CRM
 * Run with: npx tsx scripts/clear-blogs.ts
 *
 * This script:
 * 1. Fetches all blog posts from CRM API
 * 2. Deletes each blog post
 * 3. Reports on progress
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

// Fetch all blogs
async function fetchAllBlogs() {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/blog?limit=1000`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error fetching blogs: ${response.status} - ${error}`);
      return [];
    }

    const data = await response.json();
    return data.blogs || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Delete a single blog
async function deleteBlog(id: string) {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (SEED_API_KEY) {
      headers['X-API-Key'] = SEED_API_KEY;
    }

    const response = await fetch(`${CRM_API_BASE}/api/blog/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error deleting blog ${id}: ${response.status} - ${error}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    return false;
  }
}

// Main function
async function clearBlogs() {
  console.log('🗑️  Starting blog deletion...');
  console.log(`API Base: ${CRM_API_BASE}\n`);

  if (!SEED_API_KEY) {
    console.error('❌ Error: SEED_API_KEY not set. Add it to .env.local');
    process.exit(1);
  }

  // Fetch all blogs
  console.log('📥 Fetching all blog posts...');
  const blogs = await fetchAllBlogs();
  console.log(`Found ${blogs.length} blogs\n`);

  if (blogs.length === 0) {
    console.log('✓ No blogs to delete');
    process.exit(0);
  }

  // Delete each blog
  console.log('🔄 Deleting blogs...');
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    const success = await deleteBlog(blog.id);

    if (success) {
      successCount++;
      console.log(`  ✓ [${i + 1}/${blogs.length}] Deleted: ${blog.title}`);
    } else {
      failureCount++;
      console.log(`  ✗ [${i + 1}/${blogs.length}] Failed: ${blog.title}`);
    }

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`✓ Deleted: ${successCount}`);
  console.log(`✗ Failed: ${failureCount}`);
  console.log(`Total: ${blogs.length}`);

  if (failureCount === 0) {
    console.log('\n✅ All blogs deleted successfully!');
  } else {
    console.log(`\n⚠️  ${failureCount} blogs failed to delete`);
  }
}

clearBlogs().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
