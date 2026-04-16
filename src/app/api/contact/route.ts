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
    console.log('Backend response headers:', Object.fromEntries(response.headers));
    console.log('Backend response body:', responseText);

    const data = JSON.parse(responseText);

    if (!response.ok || !data.success) {
      console.error(`Backend returned ${response.status}:`, responseText);
      return NextResponse.json(
        {
          error: data.error || `Backend error: ${response.status}`,
          details: responseText,
          message: data.error || 'The backend server rejected the request.'
        },
        { status: 200 } // Return 200 so we can see the error in the UI
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
