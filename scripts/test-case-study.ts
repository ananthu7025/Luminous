/**
 * Test Case Study Upload - Diagnostic Script
 * Tests with minimal data to identify the issue
 */

import * as path from 'path';
import * as fs from 'fs';

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

async function testUpload(testName: string, payload: any) {
  console.log(`\n🧪 Test: ${testName}`);
  console.log(`Payload size: ${JSON.stringify(payload).length} bytes`);

  try {
    const response = await fetch(`${CRM_API_BASE}/api/case-studies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': SEED_API_KEY || '',
      },
      body: JSON.stringify(payload),
    });

    console.log(`Status: ${response.status}`);

    if (!response.ok) {
      const text = await response.text();
      console.log(`Response: ${text.substring(0, 200)}`);
      return false;
    }

    const result = await response.json();
    console.log(`✅ Success! ID: ${result.id}`);
    return true;
  } catch (error) {
    console.error(`❌ Error:`, error);
    return false;
  }
}

async function main() {
  console.log('🔍 Case Study Upload Diagnostics');
  console.log(`API: ${CRM_API_BASE}\n`);

  // Test 1: Minimal payload
  await testUpload('Minimal payload', {
    title: 'Test Case Study',
    slug: `test-${Date.now()}`,
    published: true,
  });

  // Test 2: With all fields but empty strings
  await testUpload('All fields (empty strings)', {
    title: 'Test Case 2',
    slug: `test-2-${Date.now()}`,
    thumbnail: '',
    industry: '',
    stack: '',
    description: '',
    content: '',
    published: true,
  });

  // Test 3: With null values
  await testUpload('All fields (null values)', {
    title: 'Test Case 3',
    slug: `test-3-${Date.now()}`,
    thumbnail: null,
    industry: null,
    stack: null,
    description: null,
    content: null,
    published: true,
  });

  // Test 4: With sample content
  await testUpload('With sample content', {
    title: 'Test Case 4',
    slug: `test-4-${Date.now()}`,
    thumbnail: '/images/test.png',
    industry: 'Technology',
    stack: 'Next.js, React',
    description: 'A test case study',
    content: 'This is test content.\n\nWith multiple paragraphs.',
    published: true,
  });

  console.log('\n✅ Diagnostics complete');
}

main().catch(console.error);
