import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { profile } from '../data/profile';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(profile.seo.canonicalUrl),
  title: profile.seo.title,
  description: profile.seo.description,
  authors: [{ name: profile.name, url: profile.seo.canonicalUrl }],
  creator: profile.name,
  keywords: profile.seo.keywords,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: profile.seo.canonicalUrl,
    title: profile.name,
    description: profile.summary,
    siteName: profile.name,
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description,
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const socialSameAs = Object.values(profile.social)
  .filter(Boolean)
  .map((value) => {
    if (
      typeof value === 'string' &&
      value.includes('@') &&
      !value.startsWith('http')
    ) {
      return `mailto:${value}`;
    }
    return value as string;
  })
  .filter(
    (value) => typeof value === 'string' && /^(https?:\/\/|mailto:)/.test(value)
  );

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location,
  },
  email: profile.email,
  telephone: profile.phone,
  url: profile.seo.canonicalUrl,
  image: profile.avatar,
  description: profile.summary,
  sameAs: socialSameAs,
  worksFor: profile.experience.map((exp) => ({
    '@type': 'Organization',
    name: exp.company,
  })),
  alumniOf: profile.education.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.school,
  })),
  hasCredential: profile.certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    name: cert.name,
    credentialCategory: 'certificate',
    recognizedBy: {
      '@type': 'Organization',
      name: cert.issuer,
    },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="bg-white font-sans text-neutral-900 antialiased selection:bg-primary-100 selection:text-primary-800 dark:bg-slate-950 dark:text-neutral-50 dark:selection:bg-primary-700 dark:selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          Skip to main content
        </a>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
