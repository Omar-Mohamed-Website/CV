import { NextResponse } from 'next/server';

// Helper endpoint to get YouTube channel ID from username
export async function GET() {
  const channelUsername = 'english_with_omarr';
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  try {
    if (apiKey) {
      // Try to get channel by username/custom URL
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelUsername}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const channelId = data.items[0].id?.channelId;
        return NextResponse.json({ channelId, username: channelUsername });
      }
    } else {
      // Fallback to no-key API
      const response = await fetch(
        `https://yt.lemnoslife.com/noKey/search?part=snippet&type=channel&q=${channelUsername}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const channelId = data.items[0].id?.channelId;
        return NextResponse.json({ channelId, username: channelUsername });
      }
    }

    return NextResponse.json(
      { error: 'Channel not found' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch channel ID' },
      { status: 500 }
    );
  }
}
