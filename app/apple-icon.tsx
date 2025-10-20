import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7AB8BF, #025159)',
          borderRadius: 36,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -1,
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif',
          }}
        >
          OM
        </div>
      </div>
    ),
    { ...size }
  );
}
