# YouTube API Setup Guide

## Problem

The YouTube real-time stats feature requires a valid YouTube Data API v3 key to fetch live subscriber counts, views, and video numbers.

## Solution

### Step 1: Get YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable the **YouTube Data API v3**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### Step 2: Configure the API Key

**Option A: Local Development**
Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_api_key_here
```

**Option B: GitHub Pages Deployment**
Since GitHub Pages doesn't support environment variables at runtime, you have two options:

1. **Build-time Configuration** (Recommended):
   - Add the API key to GitHub repository secrets
   - Go to: Repository Settings > Secrets and variables > Actions
   - Create new secret: `YOUTUBE_API_KEY`
   - Update `.github/workflows/deploy.yml` to inject it during build

2. **Client-side Public Key** (Simple but exposes key):
   - Add directly to `next.config.js`:
   ```javascript
   env: {
     NEXT_PUBLIC_YOUTUBE_API_KEY: 'your_api_key_here';
   }
   ```

   - Note: This key will be visible in your client-side code

### Step 3: Update GitHub Actions Workflow

Edit `.github/workflows/deploy.yml` and add the environment variable:

```yaml
- name: Build with Next.js
  run: npm run build
  env:
    NEXT_PUBLIC_YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
```

### Step 4: Secure Your API Key (Important!)

To prevent quota abuse, restrict your API key:

1. In Google Cloud Console, go to your API key settings
2. Set "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add: `https://omar-mohamed-website.github.io/*`
3. Set "API restrictions":
   - Select "Restrict key"
   - Choose only "YouTube Data API v3"

## Current Behavior

- **Without API key**: Shows static fallback data (859 subscribers, 140 videos, 21.2k views)
- **With valid API key**: Fetches real-time data every 5 minutes automatically

## Testing

After setup, test locally:

```bash
npm run dev
```

Visit the Projects section and check browser console for:

- ✅ Success: Stats should update with real numbers
- ❌ Error: Check console for API error messages

## Quota Limits

- YouTube Data API v3 free tier: 10,000 units/day
- Each stats fetch costs: ~1-3 units
- Component refreshes every 5 minutes
- Daily usage: ~288 requests = ~864 units (well within limits)

## Troubleshooting

### "API key not valid" error

- Verify the API key is correct
- Check that YouTube Data API v3 is enabled
- Ensure the key hasn't expired or been revoked

### Stats not updating

- Open browser DevTools console
- Look for error messages
- Verify the environment variable is set correctly
- Try clearing browser cache

### Quota exceeded

- Check your quota usage in Google Cloud Console
- Consider increasing refresh interval in `SocialStats.tsx`
- Implement caching strategy

## Alternative: Manual Update

If you prefer not to use the API, you can manually update the fallback stats in `components/SocialStats.tsx`:

```typescript
const FALLBACK_STATS = {
  youtube: {
    subscribers: 859, // Update this manually
    views: 21200, // Update this manually
    videos: 140, // Update this manually
  } as YouTubeStats,
  // ...
};
```
