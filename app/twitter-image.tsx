import { ImageResponse } from 'next/og';
import { profile } from '../data/profile';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  const title = profile.name;
  const subtitle = profile.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 64,
          background: 'linear-gradient(135deg, #01333A, #7AB8BF)',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 92,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: -1.5,
            textAlign: 'center',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.92)',
            fontSize: 40,
            marginTop: 12,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
