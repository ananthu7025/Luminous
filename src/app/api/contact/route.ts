import { NextRequest, NextResponse } from 'next/server';

const CRM_API_BASE = process.env.NEXT_PUBLIC_CRM_API_BASE || 'https://luminoustracker.luminouslogics.com';

// Handle OPTIONS requests (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Contact form request body:', body);

    const contactUrl = `${CRM_API_BASE}/api/contact-form`;
    console.log('Sending to:', contactUrl);

    const response = await fetch(contactUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log('Backend response status:', response.status);
    console.log('Backend response:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: responseText },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
