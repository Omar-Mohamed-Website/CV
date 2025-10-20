# Quick Setup Guide for Real-Time Stats

## Step 1: Get YouTube API Key

1. Visit: https://console.cloud.google.com/apis/credentials
2. Create a new project (or select existing)
3. Click "Create Credentials" → "API Key"
4. Copy the API key

## Step 2: Find Your YouTube Channel ID

Visit this URL (replace YOUR_API_KEY with your actual key):

```
https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=english_with_omarr&key=YOUR_API_KEY
```

Look for `"channelId": "UCxxxxxxxxxxxxxxxxxxxxx"` in the response.

## Step 3: Create .env.local

Create `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
ADMIN_API_KEY=generate_a_random_secure_string
```

To generate a secure admin key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Update the Channel ID

Edit `components/Projects.tsx` line ~63:

```tsx
channelId = 'UCxxxxxxxxxxxxxxxxxxxxx'; // Replace with your actual ID
```

## Step 5: Update Telegram Stats

Run this script whenever you want to update subscriber counts:

```bash
node scripts/update-telegram-stats.js
```

Or update a specific channel:

```bash
CHANNEL=english_with_omarr SUBSCRIBERS=900 node scripts/update-telegram-stats.js
```

## Step 6: Test

1. Start the dev server: `npm run dev`
2. Visit: http://localhost:3000
3. Scroll to the Projects section
4. You should see real-time stats for YouTube and Telegram!

## Notes

- YouTube stats refresh every 5 minutes automatically
- Telegram stats need to be updated manually using the script
- Stats are cached for 1 hour on the server to save API quota
