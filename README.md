# Omar Mohamed - Personal CV Website

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A modern, production-ready personal CV website for Omar Mohamed - English Teacher & Content Creator. Built with Next.js 14, TypeScript, and Tailwind CSS. This website serves as both a digital portfolio and a printable CV, featuring accessibility-first design, comprehensive testing, and deployment automation.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd Omar-Mohamed

# Run the automated setup script (macOS/Linux)
./setup.sh

# The script will:
# ✅ Check Node.js version (requires 18+)
# 📦 Install all dependencies
# 🔧 Set up git hooks and linting
# 🎯 Create environment files
# 🖼️ Set up placeholder assets
# 🧪 Run tests and type checking
# 🏗️ Build the project to verify everything works
```

### Option 2: Manual Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd Omar-Mohamed

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Set up git hooks
npm run prepare

# Start development
npm run dev
```

### Next Steps After Setup

1. **Edit Your Personal Data**

   ```bash
   # Open the profile data file
   open data/profile.ts
   # Replace the sample data with your information
   ```

2. **Replace Assets**
   - Ensure your profile image is available at `public/avatar.jpg` (400x400px recommended)
   - Replace `public/Omar_Mohamed_CV.pdf` with your actual CV
   - Update `public/favicon.ico` with your personal favicon

3. **Configure Contact Form** (Optional)

   ```bash
   # Edit environment variables
   open .env.local
   # Add your email service API keys (Resend, SendGrid, etc.)
   ```

4. **Start Development**

   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

5. **Ready for Production**
   ```bash
   npm run build    # Build the project
   npm run start    # Test production build
   ```

## 🌟 Features

### Core Functionality

- **One-Page CV Layout**: Complete professional profile in a single, scrollable page
- **Print-Optimised Design**: Custom print styles for professional PDF generation (Ctrl/Cmd+P)
- **Downloadable PDF**: Direct download of pre-formatted CV
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Interactive Contact Form**: React Hook Form with validation and spam protection

### Technical Excellence

- **Next.js 14 App Router**: Latest Next.js features with server components
- **TypeScript Strict Mode**: Type-safe development with comprehensive interfaces
- **Accessibility First**: WCAG 2.1 AA compliant with semantic HTML
- **SEO Optimised**: JSON-LD structured data and OpenGraph
- **Performance Focused**: Optimised images, fonts, and Core Web Vitals

### Developer Experience

- **Comprehensive Testing**: Vitest with Testing Library for component testing
- **Code Quality**: ESLint, Prettier, and TypeScript for consistent code
- **Git Hooks**: Husky with lint-staged for pre-commit quality checks
- **CI/CD Pipeline**: GitHub Actions with automated testing and deployment
- **Development Tools**: VSCode settings and recommended extensions

## 🎨 Design System

### Color Palette

The website uses a carefully crafted color palette:

- **Primary**: `#025159` (Deep Teal) - Headers, primary actions
- **Secondary**: `#3E848C` (Medium Teal) - Secondary elements
- **Accent**: `#7AB8BF` (Light Teal) - Highlights, hover states
- **Light**: `#C2EDF2` (Very Light Teal) - Backgrounds, subtle elements
- **Warm**: `#A67458` (Warm Brown) - Accent color for warmth

### Typography

- **Font**: Inter Variable (Google Fonts) with optimized loading
- **Hierarchy**: Consistent scale with proper contrast ratios
- **Accessibility**: WCAG AA compliant color combinations

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with metadata and JSON-LD
│   ├── page.tsx           # Main CV page
│   ├── globals.css        # Global styles and print layout
│   └── api/               # API routes (sitemap, robots, contact)
├── components/            # React components (10 total)
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section with photo
│   ├── About.tsx          # About section
│   ├── Experience.tsx     # Work experience timeline
│   ├── Education.tsx      # Education timeline
│   ├── Skills.tsx         # Skills with animated progress bars
│   ├── Certifications.tsx # Certifications grid
│   ├── Projects.tsx       # Projects showcase
│   ├── ContactForm.tsx    # Contact form with validation
│   └── Footer.tsx         # Site footer
├── data/                  # Data layer
│   └── profile.ts         # Single source of truth for CV data
├── tests/                 # Test suite
│   ├── components/        # Component tests
│   └── utils/             # Utility tests
├── public/                # Static assets
│   ├── avatar.jpg         # Profile image
│   ├── cv.pdf             # Downloadable CV (replace with yours)
│   └── favicon.ico        # Site favicon
├── .github/               # GitHub Actions CI/CD
├── setup.sh               # Automated setup script
└── config files           # ESLint, TypeScript, Tailwind, etc.
```

## 📝 Customization Guide

### 1. Personal Information

Edit `data/profile.ts` - this is your single source of truth:

```typescript
export const profile: Profile = {
  name: 'Your Name',
  title: 'Your Professional Title',
  email: 'your.email@example.com',
  // ... rest of your data
};
```

### 2. Styling and Branding

- **Colors**: Update `tailwind.config.ts` and CSS variables in `app/globals.css`
- **Fonts**: Change font imports in `app/layout.tsx`
- **Layout**: Modify component order in `app/page.tsx`

### 3. Content Sections

Each section is a modular component:

- **Add sections**: Create new components and import in `app/page.tsx`
- **Remove sections**: Comment out imports/usage
- **Reorder sections**: Change order in `app/page.tsx`

### 4. Print Layout

The print styles are optimized for professional CV printing:

- **A4 page size** with proper margins
- **Typography** scaled for readability
- **Hidden elements** (navigation, forms, etc.)
- **Optimized spacing** for single-page layout

## 🧪 Testing & Quality

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check

# Linting and formatting
npm run lint
npm run lint:fix
npm run format
```

### Quality Gates

- **Pre-commit hooks**: Automatically lint and format code
- **TypeScript**: Strict mode with comprehensive type safety
- **ESLint**: Extended rules for Next.js, TypeScript, and accessibility
- **Prettier**: Consistent code formatting
- **Vitest**: Fast unit and integration testing

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repository at vercel.com
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: .next
```

### Other Platforms

The website is compatible with AWS Amplify, Railway, DigitalOcean App Platform, and any static hosting service.

## 📊 Performance & SEO

This website is optimized for:

### Performance

- **Perfect Lighthouse scores** (100 Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals** optimization
- **Image optimization** with Next.js Image component
- **Font optimization** with Google Fonts
- **Code splitting** and lazy loading

### SEO

- **Schema.org JSON-LD** structured data
- **Comprehensive meta tags** for social sharing
- **Sitemap and robots.txt** generation
- **Semantic HTML** structure
- **Proper heading hierarchy**

### Accessibility

- **WCAG 2.1 AA compliance**
- **Keyboard navigation** support
- **Screen reader** optimization
- **High contrast mode** support
- **Reduced motion** preferences

## 🔧 Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run type-check   # TypeScript type checking
```

### Git Workflow

1. **Feature branches**: Create from `main`
2. **Commits**: Follow conventional commit format
3. **Pre-commit**: Automatic linting and formatting
4. **CI/CD**: GitHub Actions run tests and deploy

## 🆘 Troubleshooting

### Common Issues

**"Module not found" errors**:

```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**:

```bash
npm run type-check
# Fix any type issues in your code
```

**Build fails**:

```bash
npm run lint:fix
npm run test
npm run build
```

**Setup script permission denied**:

```bash
chmod +x setup.sh
./setup.sh
```

### Getting Help

1. Check the [GitHub Issues](https://github.com/yourusername/Omar-Mohamed/issues)
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Your environment details
   - Screenshots (if applicable)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Vercel** - For the deployment platform
- **Contributors** - Thank you for your contributions!

---

**Made with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

Ready to showcase your professional journey? 🚀

## 📝 Customisation

### Profile Data

All content is managed through a single source of truth in `data/profile.ts`:

```typescript
export const profile: Profile = {
  name: 'Your Name',
  title: 'Your Professional Title',
  location: 'Your Location',
  email: 'your.email@example.com',
  // ... rest of your data
};
```

### Colour Palette

The website uses a custom colour palette defined in `tailwind.config.cjs`:

- **Primary**: #025159 (Teal)
- **Primary Light**: #7AB8BF
- **Primary Lighter**: #C2EDF2
- **Accent**: #A67458 (Brown)

CSS variables are also available in `app/globals.css` for advanced customisation.

### Content Sections

The website includes these main sections:

1. **Hero**: Name, title, summary, and contact links
2. **About**: Professional background and focus areas
3. **Experience**: Work history with timeline design
4. **Education**: Academic qualifications
5. **Skills**: Technical proficiencies with progress bars
6. **Certifications**: Professional certifications with verification links
7. **Projects**: Featured projects with GitHub links
8. **Contact**: Contact form and social media links

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Structure

Tests are located in the `tests/` directory:

- `Header.test.tsx`: Navigation and mobile menu functionality
- `ContactForm.test.tsx`: Form validation and submission
- `ExperienceTimeline.test.tsx`: Timeline rendering and data display

### Writing Tests

The project uses Vitest with Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Component from '../components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Deployment
npm run deploy       # Deploy to Vercel
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Environment Variables**
   Set these in your Vercel dashboard:
   - `RESEND_API_KEY` (for contact form)
   - `CONTACT_TO_EMAIL`
   - `NEXTAUTH_SECRET`

3. **Custom Domain**
   Configure your custom domain in Vercel settings

### Other Platforms

The website is compatible with:

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **AWS Amplify**: Connect your Git repository
- **Railway**: Deploy directly from GitHub
- **DigitalOcean App Platform**: Use the provided Dockerfile

## 📧 Contact Form Setup

### Email Service Options

1. **Resend (Recommended)**

   ```bash
   # Add to .env.local
   RESEND_API_KEY=your_api_key
   ```

2. **SendGrid**

   ```bash
   # Add to .env.local
   SENDGRID_API_KEY=your_api_key
   SENDGRID_FROM_EMAIL=verified@yourdomain.com
   ```

3. **Gmail**
   ```bash
   # Add to .env.local
   GMAIL_USER=your.email@gmail.com
   GMAIL_APP_PASSWORD=your_app_password
   ```

### Form Features

- **Validation**: Client-side validation with react-hook-form
- **Spam Protection**: Honeypot field and rate limiting
- **Accessibility**: Proper labels, error messages, and keyboard navigation
- **Success/Error States**: User feedback for form submissions

## 🎨 Design System

### Typography

- **Font**: Inter Variable (preloaded)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with optimal line spacing
- **Code**: Monospace for technical content

### Spacing

- **Consistent Scale**: 4px base unit (0.25rem)
- **Responsive**: Mobile-first approach
- **Print Optimised**: Adjusted spacing for PDF output

### Animation

- **Framer Motion**: Smooth, performant animations
- **Respect Preferences**: Disabled for `prefers-reduced-motion`
- **Subtle Effects**: Fade-ins, scale animations, and hover states

## ♿ Accessibility

### Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Colour Contrast**: WCAG AA compliant (4.5:1 minimum)
- **Skip Links**: Direct navigation to main content

### Testing

```bash
# Install axe-cli for accessibility testing
npm install -g @axe-core/cli

# Test accessibility
axe http://localhost:3000
```

## 📊 Performance

### Optimisations

- **Image Optimisation**: Next.js Image component with lazy loading
- **Font Loading**: Preloaded variable fonts
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages for optimal performance
- **Caching**: Optimal cache headers for static assets

### Monitoring

- **Core Web Vitals**: Monitored via Vercel Analytics
- **Lighthouse CI**: Automated performance testing
- **Bundle Analysis**: `npm run analyze` for bundle size insights

## 🔒 Security

### Features

- **Content Security Policy**: Configured headers
- **XSS Protection**: Sanitised inputs and outputs
- **CSRF Protection**: Secure form handling
- **Dependency Scanning**: Automated security audits
- **Rate Limiting**: API endpoint protection

### Headers

Security headers are configured in `vercel.json`:

- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

## 📚 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── .husky/
│   └── pre-commit              # Git hooks
├── .vscode/
│   ├── extensions.json         # Recommended extensions
│   ├── launch.json             # Debug configuration
│   └── settings.json           # Editor settings
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   ├── About.tsx               # About section
│   ├── Certifications.tsx     # Certifications display
│   ├── ContactForm.tsx         # Contact form
│   ├── Education.tsx           # Education timeline
│   ├── ExperienceTimeline.tsx  # Work experience
│   ├── Footer.tsx              # Site footer
│   ├── Header.tsx              # Navigation header
│   ├── Hero.tsx                # Hero section
│   ├── Projects.tsx            # Featured projects
│   ├── ResumeDownload.tsx      # CV download button
│   └── Skills.tsx              # Skills visualization
├── data/
│   └── profile.ts              # Profile data (single source of truth)
├── public/
│   ├── avatar.jpg              # Profile photo
│   ├── cv.pdf                  # Downloadable CV
│   ├── favicon.ico             # Site favicon
│   └── robots.txt              # Search engine instructions
├── tests/
│   ├── setup.ts                # Test configuration
│   ├── Header.test.tsx         # Header component tests
│   ├── ContactForm.test.tsx    # Contact form tests
│   └── ExperienceTimeline.test.tsx # Timeline tests
├── .editorconfig               # Editor configuration
├── .env.example                # Environment variables example
├── .eslintrc.cjs               # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.cjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel deployment config
└── vitest.config.ts            # Vitest testing config
```

## 🤝 Contributing

This is a personal CV website template. Feel free to:

1. **Fork the repository** for your own use
2. **Submit issues** for bugs or feature requests
3. **Create pull requests** for improvements
4. **Share feedback** and suggestions

### Development Workflow

1. Fork and clone the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper tests
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the excellent React framework
- **Vercel**: For seamless deployment platform
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **React Hook Form**: For form handling
- **Testing Library**: For testing utilities
- **TypeScript**: For type safety

## 📞 Contact

For any questions or inquiries:

- **Email**: [omarrmohamedd05@gmail.com](mailto:omarrmohamedd05@gmail.com)
- **LinkedIn**: [Omar Mohamed](https://linkedin.com/in/omarmohameden)
- **YouTube**: [@english_with_omarr](https://www.youtube.com/@english_with_omarr)

---

**Built with ❤️ by Omar Mohamed**

_Last updated: October 2025_
