# Security Notes

## Current Vulnerabilities

### Development Dependencies Only

The following vulnerabilities exist but **do not affect production**:

1. **esbuild <=0.24.2** (Moderate)
   - Issue: Development server vulnerability allowing arbitrary requests
   - Impact: **Development only** - not used in production builds
   - Fix: Requires upgrading to vitest@3.2.4 (breaking change)
   - Status: Deferred - does not affect GitHub Pages deployment
   - Reference: https://github.com/advisories/GHSA-67mh-4wv8-2f99

2. **nodemailer <7.0.7** (Moderate)
   - Issue: Email interpretation conflict
   - Impact: **No impact** - only @types/nodemailer is used for TypeScript typing, not the actual nodemailer package
   - Fix: Available via npm audit fix --force (upgrades to 7.0.9)
   - Status: Deferred - API routes deleted, nodemailer not used
   - Reference: https://github.com/advisories/GHSA-mm7p-fcc7-pg87

### Why These Are Safe to Ignore for Production

- **esbuild/vitest**: Only runs during development (`npm run dev`) and testing (`npm test`). The production build is a static site exported to HTML/CSS/JS with no server component.
- **nodemailer**: Was intended for the `/api/contact` route, which has been removed. Only the TypeScript type definitions are used, not the actual library.

### Future Actions

When upgrading dependencies in the future:

- Consider upgrading to vitest@3.x when stable
- Remove @types/nodemailer if no longer needed for type checking

## Production Security

The deployed site on GitHub Pages is:

- ✅ Static HTML/CSS/JavaScript only
- ✅ No server-side code execution
- ✅ No API routes
- ✅ No database connections
- ✅ No authentication system
- ✅ Contact form uses external Formspree service (user's responsibility to configure securely)

## Reporting Security Issues

If you discover a security vulnerability in this project, please email: omarrmohamedd05@gmail.com
