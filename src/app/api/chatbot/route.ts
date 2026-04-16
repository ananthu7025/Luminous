import { NextRequest, NextResponse } from 'next/server';

const CRM_API_BASE = process.env.NEXT_PUBLIC_CRM_API_BASE || 'https://luminoustracker.luminouslogics.com';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (endpoint === 'config') {
    try {
      const response = await fetch(`${CRM_API_BASE}/api/chatbot-config`);

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Failed to fetch chatbot config' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error('Chatbot config API error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${CRM_API_BASE}/api/chatbot/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chatbot message API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
