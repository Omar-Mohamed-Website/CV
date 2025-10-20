'use client';

/**
 * SocialStats - Static display component for social media statistics
 *
 * NOTE: This component uses hard-coded statistics for GitHub Pages compatibility.
 * The previous dynamic API-based stats fetching was removed because GitHub Pages
 * only supports static site generation and cannot execute server-side API routes.
 *
 * To update statistics:
 * 1. Check your YouTube/Telegram analytics
 * 2. Update the hardcoded values in this component
 * 3. Rebuild and redeploy the site
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
  // Static stats - update these manually when redeploying
  initialStats?: YouTubeStats | TelegramStats;
}

// Hard-coded statistics for GitHub Pages deployment
// Update these values manually before each deployment
const STATIC_STATS = {
  youtube: {
    subscribers: 859,
    views: 21200,
    videos: 140,
  } as YouTubeStats,
  telegram: {
    subscribers: 897,
  } as TelegramStats,
};

export default function SocialStats({
  platform,
  initialStats,
}: SocialStatsProps) {
  // Use provided initialStats or fall back to static data
  const stats = initialStats || STATIC_STATS[platform];

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
