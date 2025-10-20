'use client';

import { useEffect, useState } from 'react';

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
  // For YouTube, prefer providing a handle like "@english_with_omarr" or a channelId
  channelId?: string;
  youtubeHandle?: string;
  channelUsername?: string; // Telegram username
  initialStats?: YouTubeStats | TelegramStats;
}

export default function SocialStats({
  platform,
  channelId,
  channelUsername,
  youtubeHandle,
  initialStats,
}: SocialStatsProps) {
  const [stats, setStats] = useState<YouTubeStats | TelegramStats | null>(
    initialStats || null
  );
  const [loading, setLoading] = useState(!initialStats);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        if (platform === 'youtube' && (channelId || youtubeHandle)) {
          const params = new URLSearchParams();
          if (channelId) params.set('channelId', channelId);
          if (youtubeHandle) params.set('handle', youtubeHandle);

          const response = await fetch(
            `/api/youtube-stats?${params.toString()}`
          );
          if (!response.ok) throw new Error('Failed to fetch YouTube stats');

          const data = await response.json();
          if (data && typeof data.subscribers === 'number') {
            setStats({
              subscribers: data.subscribers,
              views: data.views,
              videos: data.videos,
            } as YouTubeStats);
          }
        } else if (platform === 'telegram' && channelUsername) {
          const response = await fetch(
            `/api/telegram-stats?channel=${channelUsername}`
          );
          if (!response.ok) throw new Error('Failed to fetch Telegram stats');

          const data = await response.json();
          setStats({ subscribers: data.subscribers } as TelegramStats);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [platform, channelId, channelUsername, youtubeHandle]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        <span>Loading stats...</span>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail - show static content instead
  }

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
