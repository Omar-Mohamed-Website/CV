import { NextResponse } from 'next/server';

import { profile } from '../../../data/profile';

export async function GET() {
  const baseUrl = profile.seo.canonicalUrl;

  const robotsTxt = `# Robots.txt for Personal CV Website
# ${baseUrl}

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

# Block unnecessary crawlers to save bandwidth
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

# Crawl delay for politeness
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
