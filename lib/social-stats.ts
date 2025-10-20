// YouTube API integration
export interface YouTubeStats {
  subscribers: number;
  views: number;
  videos: number;
}

// Telegram API integration
export interface TelegramStats {
  subscribers: number;
}

export interface SocialStats {
  youtube?: YouTubeStats;
  telegram?: TelegramStats;
  lastUpdated: string;
}

// YouTube Data API v3
export async function getYouTubeStats(
  channelId: string
): Promise<YouTubeStats | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    if (!apiKey) {
      return null;
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }
    const stats = data.items[0].statistics;

    return {
      subscribers: parseInt(stats.subscriberCount || '0'),
      views: parseInt(stats.viewCount || '0'),
      videos: parseInt(stats.videoCount || '0'),
    };
  } catch {
    return null;
  }
}

// Telegram doesn't have a public API for subscriber counts
// We'll use a webhook/manual update approach or scraping (not recommended)
// For now, we'll create an API endpoint to manually update these values
export async function getTelegramStats(
  channelUsername: string
): Promise<TelegramStats | null> {
  try {
    // Option 1: Use your own backend endpoint that you manually update
    const response = await fetch(
      `/api/telegram-stats?channel=${channelUsername}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      subscribers: data.subscribers || 0,
    };
  } catch {
    return null;
  }
}

// Get all social stats
export async function getAllSocialStats(): Promise<SocialStats> {
  const [youtubeStats, telegramStats] = await Promise.all([
    getYouTubeStats('UCYourChannelIdHere'), // Replace with actual channel ID
    getTelegramStats('english_with_omarr'),
  ]);

  return {
    youtube: youtubeStats || undefined,
    telegram: telegramStats || undefined,
    lastUpdated: new Date().toISOString(),
  };
}
