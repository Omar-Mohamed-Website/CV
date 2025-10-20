# GitHub Pages Deployment Guide

This project is configured for deployment to GitHub Pages using static export.

## 🚀 Quick Setup (5 minutes)

### Step 1: Enable GitHub Pages ⚠️ REQUIRED

GitHub Pages **must be manually enabled** in repository settings:

1. Go to your repository on GitHub: `https://github.com/Omar-Mohamed-Website/Omar-Mohamed`
2. Click **Settings** tab (top right)
3. Scroll down and click **Pages** in the left sidebar
4. Under **Source**, select: **GitHub Actions** (NOT "Deploy from a branch")
5. Click **Save** (if button appears)

> **Important**: This step cannot be automated. You must do this manually once.

### Step 2: Set Up Contact Form (Formspree) ⚠️ REQUIRED

Since GitHub Pages doesn't support server-side code, the contact form requires Formspree:

#### Option A: Using Formspree (Free - 50 submissions/month)

1. Sign up at [formspree.io](https://formspree.io) (free account)
2. Create a new form (click "New Form")
3. Copy your form ID (looks like `abc123xyz`)
4. Add it as a repository secret:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NEXT_PUBLIC_FORMSPREE_ID`
   - Value: Your form ID (just the ID, e.g., `abc123xyz`)
   - Click **Add secret**

#### Option B: Without Formspree

If you skip Formspree setup, the contact form **will not work**. Users will see an error when submitting. You have two alternatives:

- Remove the contact form component
- Deploy to Vercel instead (see below)

### Step 3: Update Social Media Stats

The project displays YouTube and Telegram statistics. These are now **hard-coded** for GitHub Pages:

1. Open `components/SocialStats.tsx`
2. Find the `STATIC_STATS` object (around line 35)
3. Update the values with your current statistics:
   ```typescript
   const STATIC_STATS = {
     youtube: {
       subscribers: 859, // Update this
       views: 21200, // Update this
       videos: 140, // Update this
     },
     telegram: {
       subscribers: 897, // Update this
     },
   };
   ```
4. Save and commit changes

> **Note**: Stats will not update automatically. You must manually update these values and redeploy.

### Step 4: Push to GitHub and Deploy

1. Commit and push your changes:

   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

2. The deployment workflow will automatically run

3. Check deployment status:
   - Go to **Actions** tab
   - Look for "Deploy to GitHub Pages" workflow
   - Wait for green checkmark (takes 2-3 minutes)

### Step 5: Access Your Live Site

Once deployed, your site will be live at:

```
https://omar-mohamed-website.github.io/Omar-Mohamed/
```

## 📝 Manual Workflow Trigger (If Needed)

If automatic deployment doesn't start:

1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** dropdown
4. Select `main` branch
5. Click green **Run workflow** button

## 🎯 What Works on GitHub Pages

✅ **Working Features:**

- Static website with all pages
- Responsive design and animations
- Theme toggle (dark/light mode)
- Social media links
- Project showcase
- Skills and education sections
- Static social media stats (manually updated)
- Contact form (with Formspree setup)

❌ **Not Available:**

- Dynamic stats fetching from YouTube/Telegram APIs
- Server-side contact form processing (without Formspree)
- Real-time data updates

## 🔄 Alternative: Deploy to Vercel (Full Features)

For the best experience with **all features** including API routes and dynamic stats:

### Why Vercel?

- ✅ Supports API routes (contact form works natively)
- ✅ Could support real-time stats (if API keys provided)
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Unlimited bandwidth (free tier)
- ✅ No manual configuration needed

### Deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: [Your account]
# - Link to existing project: N
# - Project name: omar-mohamed-portfolio
# - Directory: ./
# - Override settings: N
```

Or deploy via Vercel dashboard:

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js and deploys

> **Note**: You'll need to revert some changes if deploying to Vercel:
>
> - Change `next.config.js` output back to default
> - Optionally restore API routes for contact form
> - Add API keys for YouTube/Telegram stats

## 🔧 Troubleshooting

### Site Not Appearing?

**Check GitHub Pages is enabled:**

- Settings → Pages → Source should be "GitHub Actions"

**Check deployment status:**

- Actions tab → Look for green checkmarks
- Click on latest workflow run to see details

**Clear browser cache:**

- Hard refresh: Cmd/Ctrl + Shift + R
- Or open in incognito/private window

### Contact Form Not Working?

**Verify Formspree is set up:**

- Check repository secrets: Settings → Secrets and variables → Actions
- Verify `NEXT_PUBLIC_FORMSPREE_ID` exists
- Redeploy after adding the secret

**Test Formspree directly:**

- Try submitting the form
- Check Formspree dashboard for submissions

### Stats Not Updating?

Stats are **static** on GitHub Pages:

1. Update values in `components/SocialStats.tsx`
2. Commit and push changes
3. Wait for redeployment

### 404 Errors?

**Base path issue:**

- GitHub Pages URL must include repository name: `/Omar-Mohamed/`
- Check `next.config.js` has correct basePath (currently: empty for root domain)

**Missing pages:**

- Check `out/` directory after build contains all pages
- Run `npm run build` locally to test

### Deployment Fails?

**Check workflow logs:**

1. Actions tab
2. Click failed workflow run
3. Expand failed step to see error

**Common issues:**

- Build errors: Run `npm run build` locally first
- Permissions: Check deploy.yml has correct permissions
- Secrets: Verify environment variables are set

## 📊 Monitoring

**Check deployment:**

```bash
# View deployment logs
gh run list --workflow=deploy.yml
gh run view [run-id]
```

**Check build output:**

- Actions tab shows build time and size
- Typical build: ~30-60 seconds
- Output size: ~5-10 MB

## 🔐 Security Notes

See [SECURITY.md](./SECURITY.md) for details on:

- Development-only vulnerabilities (don't affect production)
- Why certain npm audit warnings can be ignored
- Production security considerations

## 📚 Additional Documentation

- [Real-Time Stats Setup](./docs/REAL_TIME_STATS.md) - How the stats API worked (now disabled)
- [Deployment Checklist](./DEPLOYMENT.md) - Full deployment guide
- [README.md](./README.md) - Project overview and local development

## 🆘 Need Help?

1. Check this guide first
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Check [Next.js static export docs](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
4. Contact: omarrmohamedd05@gmail.com
