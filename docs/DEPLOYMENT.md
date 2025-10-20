# Vercel Deployment Setup

## GitHub Secrets Configuration

To enable automatic deployment to Vercel through GitHub Actions, you need to configure the following repository secret:

### Required Secret

1. **VERCEL_TOKEN**
   - Go to [Vercel Account Tokens](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions
   - Copy the token value

### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add the secret:
   - Name: `VERCEL_TOKEN`
   - Value: Your Vercel token

### Vercel Project Setup

1. Connect your GitHub repository to Vercel
2. Import your project in the Vercel dashboard
3. Configure build settings (usually auto-detected for Next.js)
4. The CI/CD pipeline will handle deployments automatically

### Deployment Triggers

- **Preview Deployments**: Triggered on pull requests to `main` branch
- **Production Deployments**: Triggered on pushes to `main` branch

### Troubleshooting

If deployments fail:

1. Verify the `VERCEL_TOKEN` secret is correctly set
2. Ensure your Vercel project is linked to the GitHub repository
3. Check that your Vercel account has sufficient permissions
4. Review the GitHub Actions logs for detailed error messages
