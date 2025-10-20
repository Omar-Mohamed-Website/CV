# GitHub Pages Deployment Guide

This project is configured for deployment to GitHub Pages using static export.

## Quick Setup (5 minutes)

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Omar-Mohamed-Website/Omar-Mohamed`
2. Click **Settings** → **Pages** (in left sidebar)
3. Under **Source**, select: **GitHub Actions**

### Step 2: Trigger Deployment

The site will automatically deploy when you push to the `main` branch.

Alternatively, trigger manually:

1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Step 3: Access Your Site

Once deployed (takes 2-3 minutes), your site will be live at:

```
https://omar-mohamed-website.github.io/Omar-Mohamed/
```

## Optional: Setup Contact Form (Formspree)

Since GitHub Pages doesn't support server-side code, the contact form uses Formspree (free tier: 50 submissions/month):

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Add it to your repository secrets:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `FORMSPREE_ID`
   - Value: `your-form-id` (just the ID, not the full URL)
4. Redeploy the site

Without Formspree, the form will try to use the `/api/contact` endpoint (which won't work on GitHub Pages, but will work if you deploy to Vercel).

## Alternative: Deploy to Vercel (Recommended for Full Features)

For the best experience with API routes (contact form, live stats), deploy to Vercel instead:

```bash
npm install -g vercel
vercel
```

Vercel's free tier includes:

- ✅ API routes support
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Unlimited bandwidth

## What's Different on GitHub Pages?

- ❌ No API routes (contact form, stats APIs removed)
- ❌ No server-side rendering
- ✅ Fast, static site
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domain support

## Troubleshooting

**Site not updating?**

- Check the Actions tab for deployment status
- Clear browser cache (Cmd/Ctrl + Shift + R)

**Contact form not working?**

- Set up Formspree (see above)
- Or use Vercel for full API support

**404 errors?**

- GitHub Pages URL must include repo name: `/Omar-Mohamed/`
- Check that base path is configured correctly
