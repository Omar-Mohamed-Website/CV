# Real-Time Social Media Statistics

This document explains how to set up and use the real-time statistics feature for YouTube and Telegram.

## Features

- **YouTube Statistics**: Automatically fetches subscriber count, video count, and total views
- **Telegram Statistics**: Manual update system with API endpoint
- **Auto-refresh**: Stats refresh every 5 minutes
- **Caching**: Server-side caching to reduce API calls (1 hour cache)

## Setup

### 1. YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Create credentials (API Key)
5. Copy the API key

### 2. Get YouTube Channel ID

Run this command to find your channel ID:

```bash
# Visit this URL in your browser (replace YOUR_API_KEY)
https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=english_with_omarr&key=YOUR_API_KEY
```

Or use the helper endpoint:

```bash
npm run dev
# Then visit: http://localhost:3000/api/youtube-channel-id
```

The channel ID looks like: `UCxxxxxxxxxxxxxxxxxxxxx`

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# YouTube Data API v3 Key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here

# Admin API Key for updating Telegram stats
ADMIN_API_KEY=your_secure_random_string_here
```

### 4. Update YouTube Channel ID

Edit `/components/Projects.tsx` and replace `UCYourChannelIdHere` with your actual channel ID:

```tsx
<SocialStats
  platform="youtube"
  channelId="UCxxxxxxxxxxxxxxxxxxxxx" // Your actual channel ID
/>
```

## Usage

### Updating Telegram Statistics

Since Telegram doesn't provide a public API for subscriber counts, you need to manually update the stats.

#### Option 1: Using cURL

```bash
curl -X POST http://localhost:3000/api/telegram-stats \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secure_random_string_here" \
  -d '{"channel": "english_with_omarr", "subscribers": 900}'
```

#### Option 2: Create a simple update script

Create `scripts/update-telegram-stats.js`:

```javascript
const channelUsername = 'english_with_omarr';
const subscribers = 900; // Update this number
const apiKey = process.env.ADMIN_API_KEY;

fetch('http://localhost:3000/api/telegram-stats', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  },
  body: JSON.stringify({ channel: channelUsername, subscribers }),
})
  .then((res) => res.json())
  .then((data) => console.log('Updated:', data))
  .catch((err) => console.error('Error:', err));
```

Then run:

```bash
node scripts/update-telegram-stats.js
```

### Checking Current Stats

Visit these endpoints to check current statistics:

- **Telegram Stats**: `http://localhost:3000/api/telegram-stats?channel=english_with_omarr`
- **YouTube Channel ID**: `http://localhost:3000/api/youtube-channel-id`

## Production Deployment

### Vercel

1. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_YOUTUBE_API_KEY`
   - `ADMIN_API_KEY`

2. For Telegram stats in production, consider:
   - Using a database (e.g., Vercel KV, Supabase)
   - Creating a scheduled job to update stats
   - Using Vercel Cron Jobs or GitHub Actions

### Database Option (Recommended for Production)

For production, replace the in-memory storage with a database:

```typescript
// Example with Vercel KV
import { kv } from '@vercel/kv';

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.searchParams.get('channel');
  const stats = await kv.get(`telegram:${channel}`);
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  // Verify API key
  const { channel, subscribers } = await request.json();
  await kv.set(`telegram:${channel}`, {
    subscribers,
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}
```

## Troubleshooting

### YouTube API Quota Exceeded

- The API has a daily quota of 10,000 units
- Each request uses ~3 units
- With 1-hour caching, you'll make max ~24 requests/day = ~72 units
- If you exceed quota, the stats will fall back to static values

### Stats Not Showing

1. Check browser console for errors
2. Verify API keys in `.env.local`
3. Check that the YouTube channel ID is correct
4. Ensure the development server is running

### Telegram Stats Not Updating

1. Verify the `ADMIN_API_KEY` matches in your request
2. Check the channel username is correct
3. Look at the API response for error messages

## Security Notes

- **Never commit `.env.local`** to git
- Keep your `ADMIN_API_KEY` secret
- The YouTube API key is public (NEXT*PUBLIC*\*) but restricted by domain in production
- Consider rate limiting the Telegram stats update endpoint
- In production, use HTTPS for all API requests

## Future Enhancements

- Automated Telegram stats scraping (using Puppeteer)
- Instagram API integration
- TikTok API integration
- Historical data tracking
- Charts and analytics dashboard
