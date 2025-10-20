import { NextRequest, NextResponse } from 'next/server';

// In-memory store for Telegram stats (in production, use a database)
const telegramStats: Record<string, { subscribers: number; updatedAt: string }> = {
  'english_with_omarr': {
    subscribers: 897,
    updatedAt: new Date().toISOString(),
  },
  'Omar2007S': {
    subscribers: 0, // Update this manually
    updatedAt: new Date().toISOString(),
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channel = searchParams.get('channel');

  if (!channel) {
    return NextResponse.json(
      { error: 'Channel parameter is required' },
      { status: 400 }
    );
  }

  const stats = telegramStats[channel];

  if (!stats) {
    return NextResponse.json(
      { error: 'Channel not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    channel,
    subscribers: stats.subscribers,
    updatedAt: stats.updatedAt,
  });
}

// POST endpoint to update stats (protected with API key)
export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    // Protect the endpoint
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { channel, subscribers } = body;

    if (!channel || typeof subscribers !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    telegramStats[channel] = {
      subscribers,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      channel,
      subscribers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
