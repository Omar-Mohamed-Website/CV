import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 12,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 36,
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
