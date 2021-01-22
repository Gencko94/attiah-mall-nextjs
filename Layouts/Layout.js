import dynamic from 'next/dynamic';
import React from 'react';
import isMobile from '../utils/isMobile';

const CurrentLayout = dynamic(
  () => (isMobile() ? import('./Mobile/Mobile') : import('./Desktop/Desktop')),
  { ssr: false }
);
export default function Layout({ children }) {
  return (
    <div>
      <CurrentLayout>{children}</CurrentLayout>
    </div>
  );
}
