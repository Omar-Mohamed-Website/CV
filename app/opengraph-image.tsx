import { ImageResponse } from 'next/og';
import { profile } from '../data/profile';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OGImage() {
  const title = profile.name;
  const subtitle = profile.title;
  const url = profile.seo.canonicalUrl.replace(/^https?:\/\//, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '64px',
          background: 'linear-gradient(135deg, #7AB8BF, #025159)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.18)',
            color: 'white',
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          {url}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 96,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 40,
            marginTop: 12,
            fontWeight: 600,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
