import { NextRequest, NextResponse } from 'next/server';

type YouTubeStats = {
  subscribers: number;
  views: number;
  videos: number;
  channelId?: string;
};

async function fetchChannelStatsById(apiKey: string, channelId: string): Promise<YouTubeStats | null> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(channelId)}&key=${apiKey}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.items || data.items.length === 0) return null;
  const stats = data.items[0].statistics;
  return {
    subscribers: parseInt(stats?.subscriberCount ?? '0', 10),
    views: parseInt(stats?.viewCount ?? '0', 10),
    videos: parseInt(stats?.videoCount ?? '0', 10),
    channelId,
  };
}

async function resolveChannelIdFromQuery(apiKey: string, query: string): Promise<string | null> {
  // Remove leading @ if present
  const q = query.startsWith('@') ? query.slice(1) : query;
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(q)}&key=${apiKey}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const item = data.items?.[0];
  return item?.id?.channelId ?? null;
}

async function resolveChannelIdNoKey(query: string): Promise<string | null> {
  const q = query.startsWith('@') ? query.slice(1) : query;
  const res = await fetch(
    `https://yt.lemnoslife.com/noKey/search?part=snippet&type=channel&q=${encodeURIComponent(q)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const item = data.items?.[0];
  return item?.id?.channelId ?? null;
}

async function fetchChannelStatsNoKey(channelId: string): Promise<YouTubeStats | null> {
  const res = await fetch(
    `https://yt.lemnoslife.com/noKey/channels?part=statistics&id=${encodeURIComponent(channelId)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.items || data.items.length === 0) return null;
  const stats = data.items[0].statistics;
  return {
    subscribers: parseInt(stats?.subscriberCount ?? '0', 10),
    views: parseInt(stats?.viewCount ?? '0', 10),
    videos: parseInt(stats?.videoCount ?? '0', 10),
    channelId,
  };
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const handle = url.searchParams.get('handle');
  const channelId = url.searchParams.get('channelId');

  const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  try {
    let id = channelId ?? null;
    if (!id && handle) {
      id = apiKey ? await resolveChannelIdFromQuery(apiKey, handle) : await resolveChannelIdNoKey(handle);
    }
    if (!id) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const stats = apiKey
      ? await fetchChannelStatsById(apiKey, id)
      : await fetchChannelStatsNoKey(id);
    if (!stats) {
      return NextResponse.json({ error: 'Failed to fetch channel stats' }, { status: 502 });
    }
    return NextResponse.json(stats, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
