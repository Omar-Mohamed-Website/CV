# 🚀 Deployment Checklist for GitHub Pages

Use this checklist to ensure successful deployment of Omar Mohamed's portfolio website to GitHub Pages.

## ✅ Pre-Deployment Checklist

### 1. Code Quality Checks

Run these commands locally to ensure everything works:

```bash
# Type checking
npm run type-check
# Should show: No errors

# Linting
npm run lint
# Should show: ✔ No ESLint warnings or errors

# Formatting
npm run format:check
# Should show: All matched files use Prettier code style!

# Tests
npm run test -- --run
# Should show: All tests passed

# Build
npm run build
# Should show: Build successful, pages exported to ./out
```

All commands must pass ✅ before deploying.

### 2. Content Updates

- [ ] **Update Social Media Stats** in `components/SocialStats.tsx`:
  - [ ] YouTube subscribers count
  - [ ] YouTube video count
  - [ ] YouTube total views
  - [ ] Telegram subscribers count

- [ ] **Update Profile Data** in `data/profile.ts` if needed:
  - [ ] Experience entries
  - [ ] Education entries
  - [ ] Skills and proficiency levels
  - [ ] Certifications
  - [ ] Projects
  - [ ] Contact information

- [ ] **Update Images** in `public/` directory:
  - [ ] Avatar photo (`avatar.jpg`)
  - [ ] Project screenshots (`projects/`)
  - [ ] Favicon if needed

### 3. Configuration Files

- [ ] Verify `next.config.js` has static export enabled
- [ ] Check `public/sitemap.xml` has correct URLs
- [ ] Ensure `.github/workflows/deploy.yml` exists
- [ ] Confirm `.github/workflows/nextjs.yml` is deleted (redundant)

## 🔐 GitHub Repository Setup

### 4. Repository Settings

- [ ] **Enable GitHub Pages** (REQUIRED - cannot be automated):
  1. Go to repository on GitHub
  2. Click **Settings** tab
  3. Click **Pages** in left sidebar
  4. Under **Source**, select **GitHub Actions**
  5. Save changes

### 5. Environment Variables & Secrets

- [ ] **Set up Formspree** for contact form:
  1. Create account at [formspree.io](https://formspree.io)
  2. Create new form
  3. Copy form ID
  4. Add to repository secrets:
     - Name: `NEXT_PUBLIC_FORMSPREE_ID`
     - Value: Your form ID

- [ ] Verify secrets are set:
  - Go to Settings → Secrets and variables → Actions
  - Confirm `NEXT_PUBLIC_FORMSPREE_ID` appears in list

## 📤 Deployment

### 6. Push to GitHub

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Update portfolio for deployment"

# Push to main branch
git push origin main
```

### 7. Monitor Deployment

- [ ] Go to **Actions** tab on GitHub
- [ ] Find "Deploy to GitHub Pages" workflow
- [ ] Wait for green checkmark (2-3 minutes)
- [ ] If failed: Click on workflow → View logs → Fix errors

### 8. Verify Deployment

- [ ] **Visit live site**: `https://omar-mohamed-website.github.io/Omar-Mohamed/`
- [ ] **Test all pages**:
  - [ ] Home page loads correctly
  - [ ] Hero section displays
  - [ ] About section shows
  - [ ] Experience timeline renders
  - [ ] Skills display properly
  - [ ] Projects section works
  - [ ] Contact form appears

- [ ] **Test functionality**:
  - [ ] Theme toggle (dark/light mode) works
  - [ ] All internal links work
  - [ ] All external links open in new tabs
  - [ ] Social media stats display
  - [ ] Contact form accepts input
  - [ ] Submit contact form (test Formspree)

- [ ] **Test responsive design**:
  - [ ] Desktop view (1920px)
  - [ ] Laptop view (1440px)
  - [ ] Tablet view (768px)
  - [ ] Mobile view (375px)

- [ ] **Test browser compatibility**:
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile browsers

## 🐛 Troubleshooting

### If Deployment Fails

1. **Check build logs**:
   - Actions tab → Click failed run → View logs
   - Look for error messages

2. **Common issues**:
   - TypeScript errors → Run `npm run type-check` locally
   - Lint errors → Run `npm run lint` locally
   - Build errors → Run `npm run build` locally
   - Missing dependencies → Run `npm ci`

3. **Fix and retry**:
   ```bash
   # Fix the issue locally
   git add .
   git commit -m "Fix: [describe fix]"
   git push origin main
   ```

### If Site Doesn't Appear

1. **Verify GitHub Pages is enabled**:
   - Settings → Pages → Source = "GitHub Actions"

2. **Check workflow ran successfully**:
   - Actions tab → Green checkmark

3. **Clear browser cache**:
   - Hard refresh: Cmd/Ctrl + Shift + R
   - Or use incognito/private window

4. **Wait a few minutes**:
   - GitHub Pages can take 5-10 minutes to propagate

### If Contact Form Doesn't Work

1. **Check Formspree secret is set**:
   - Settings → Secrets and variables → Actions
   - Verify `NEXT_PUBLIC_FORMSPREE_ID` exists

2. **Redeploy after adding secret**:

   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

3. **Test Formspree directly**:
   - Log into Formspree dashboard
   - Check submissions list

## 📊 Post-Deployment

### 9. Performance Checks

- [ ] **Lighthouse audit** (optional):
  - Open DevTools → Lighthouse tab
  - Run audit
  - Target: 90+ scores in all categories

- [ ] **Load time check**:
  - Open Network tab in DevTools
  - Reload page
  - Check total load time < 3 seconds

### 10. SEO Verification

- [ ] **Test meta tags**:
  - View page source
  - Verify title, description, keywords present
  - Check Open Graph tags for social sharing

- [ ] **Submit to search engines**:
  - [ ] Google Search Console
  - [ ] Bing Webmaster Tools

## 🔄 Regular Maintenance

### When to Redeploy

Redeploy when:

- Social media stats need updating (weekly/monthly)
- Adding new projects or experience
- Fixing bugs or typos
- Updating content

### How to Update Stats

1. Edit `components/SocialStats.tsx`
2. Update `STATIC_STATS` object
3. Commit and push:
   ```bash
   git add components/SocialStats.tsx
   git commit -m "Update social media statistics"
   git push origin main
   ```
4. Wait 2-3 minutes for redeployment

## 📞 Support

If you encounter issues:

1. Check [GITHUB_PAGES.md](./GITHUB_PAGES.md) for detailed guide
2. Review [SECURITY.md](./SECURITY.md) for security notes
3. Check [GitHub Actions logs](https://github.com/Omar-Mohamed-Website/Omar-Mohamed/actions)
4. Contact: omarrmohamedd05@gmail.com

## ✨ Success Criteria

Your deployment is successful when:

- ✅ All pre-deployment checks pass
- ✅ GitHub Actions workflow completes with green checkmark
- ✅ Live site loads at correct URL
- ✅ All pages and features work correctly
- ✅ Responsive design works on all devices
- ✅ Contact form successfully submits (with Formspree)
- ✅ No console errors in browser DevTools
- ✅ Fast load times (< 3 seconds)

---

**Last Updated**: 2024-10-20  
**Version**: 1.0.0  
**Deployment Target**: GitHub Pages (Static Export)
