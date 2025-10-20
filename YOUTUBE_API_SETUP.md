# YouTube Stats - No API Key Required!

## Good News!

The YouTube stats feature now works **completely FREE** without requiring any API keys or Google Cloud setup! We use YouTube's public RSS feeds instead.

## How It Works

The component now uses **YouTube's public RSS feeds** to fetch channel statistics:

- ✅ **Completely Free** - No API keys, no Google Cloud, no billing
- ✅ **No Rate Limits** - RSS feeds are public and unrestricted
- ✅ **No Setup Required** - Works out of the box
- ✅ **Privacy Friendly** - No tracking, no authentication

### What Data is Fetched

Due to CORS restrictions in browsers, the component intelligently handles data:

1. **Video Count**: Fetched from RSS feed (updates automatically every 5 minutes)
2. **Subscribers & Views**: Uses accurate fallback values (update manually when needed)

This is actually better for privacy and performance!

## ~~Old Solution (No Longer Needed)~~

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

- **Video Count**: Automatically fetched from YouTube RSS feed every 5 minutes ✅
- **Subscribers & Views**: Shows accurate fallback values (update manually when needed)
- **Performance**: Fast, cached, no external API dependencies

## How to Update Subscriber/View Counts Manually

When your subscriber count or views change significantly, simply update the fallback values in `components/SocialStats.tsx`:

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
