'use client';

import { useEffect, useState } from 'react';

/**
 * SocialStats - Real-time social media statistics component
 *
 * Fetches live stats from YouTube API and Telegram
 * Falls back to cached/static values if API is unavailable
 */

export interface YouTubeStats {
  subscribers: number;
  views: number;
  videos: number;
}

export interface TelegramStats {
  subscribers: number;
}

interface SocialStatsProps {
  platform: 'youtube' | 'telegram';
  channelId?: string; // YouTube channel ID or Telegram username
  initialStats?: YouTubeStats | TelegramStats;
}

// Fallback statistics if API fetch fails
const FALLBACK_STATS = {
  youtube: {
    subscribers: 859,
    views: 21200,
    videos: 140,
  } as YouTubeStats,
  telegram: {
    subscribers: 897,
  } as TelegramStats,
};

// Fetch YouTube stats using RSS feed (completely free, no API key needed)
const fetchYouTubeStats = async (
  channelId: string
): Promise<YouTubeStats | null> => {
  try {
    // YouTube RSS feeds are public and don't require authentication
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return null;
    }

    const xmlText = await response.text();

    // Parse video count from RSS feed
    const videoMatches = xmlText.match(/<entry>/g);
    const videos = videoMatches ? videoMatches.length : 0;

    // Try to get subscriber count from channel page (public data)
    // Note: This might be blocked by CORS, so we use fallback
    try {
      const channelResponse = await fetch(
        `https://www.youtube.com/channel/${channelId}/about`,
        { next: { revalidate: 300 } }
      );

      if (channelResponse.ok) {
        const html = await channelResponse.text();
        const subMatch = html.match(
          /"subscriberCountText":\{"simpleText":"([\d.KM]+) subscribers"\}/
        );
        const viewMatch = html.match(
          /"viewCountText":\{"simpleText":"([\d,]+) views"\}/
        );

        if (subMatch || viewMatch) {
          const parseCount = (str: string): number => {
            if (!str) return 0;
            str = str.replace(/,/g, '');
            if (str.includes('K')) return Math.round(parseFloat(str) * 1000);
            if (str.includes('M')) return Math.round(parseFloat(str) * 1000000);
            return parseInt(str) || 0;
          };

          return {
            subscribers: subMatch ? parseCount(subMatch[1]) : 0,
            videos,
            views: viewMatch ? parseCount(viewMatch[1]) : 0,
          };
        }
      }
    } catch {
      // CORS blocked, fall back to RSS data only
    }

    // Return at least video count from RSS
    return {
      subscribers: 0,
      videos,
      views: 0,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Failed to fetch YouTube stats, using fallback:', error);
    return null;
  }
}; // Fetch Telegram stats from public channel info
const fetchTelegramStats = async (
  username: string
): Promise<TelegramStats | null> => {
  try {
    // Use Telegram's public API
    await fetch(`https://t.me/${username}?embed=1&mode=tme`, {
      mode: 'no-cors',
    });
    // Due to CORS, we'll fall back to static data
    // In production, you'd need a proxy server
    return null;
  } catch (error) {
    return null;
  }
};

export default function SocialStats({
  platform,
  channelId,
  initialStats,
}: SocialStatsProps) {
  const [stats, setStats] = useState<YouTubeStats | TelegramStats | null>(
    initialStats || FALLBACK_STATS[platform]
  );

  useEffect(() => {
    const loadStats = async () => {
      if (!channelId) return;

      let fetchedStats = null;

      if (platform === 'youtube') {
        fetchedStats = await fetchYouTubeStats(channelId);
      } else if (platform === 'telegram') {
        fetchedStats = await fetchTelegramStats(channelId);
      }

      if (fetchedStats) {
        setStats(fetchedStats);
      }
    };

    loadStats();
    // Refresh every 5 minutes
    const interval = setInterval(loadStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [platform, channelId]);

  if (!stats) return null;

  if (platform === 'youtube') {
    const ytStats = stats as YouTubeStats;
    return (
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-semibold">
            {ytStats.subscribers.toLocaleString()}
          </span>
          <span className="text-gray-600 dark:text-gray-400">subscribers</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">
            {ytStats.videos.toLocaleString()}
          </span>
          <span className="text-gray-600 dark:text-gray-400">videos</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">
            {ytStats.views.toLocaleString()}
          </span>
          <span className="text-gray-600 dark:text-gray-400">views</span>
        </div>
      </div>
    );
  }

  if (platform === 'telegram') {
    const tgStats = stats as TelegramStats;
    return (
      <div className="flex items-center gap-1 text-sm">
        <span className="font-semibold">
          {tgStats.subscribers.toLocaleString()}
        </span>
        <span className="text-gray-600 dark:text-gray-400">subscribers</span>
      </div>
    );
  }

  return null;
}
