import { useRouter } from 'next/router';
import React from 'react';
import ContentLoader from 'react-content-loader';

export default function MobileCartContainerLoader() {
  const { locale } = useRouter();
  return (
    <div className="mt-4">
      <ContentLoader
        speed={3}
        viewBox="0 0 400 450"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        rtl={locale === 'ar'}
      >
        <rect x="0" y="0" rx="1" ry="1" width="28%" height="85" />
        <rect x="30%" y="0" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="30px" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="60px" rx="1" ry="1" width="77%" height="25" />

        <rect x="0" y="105" rx="1" ry="1" width="28%" height="85" />
        <rect x="30%" y="105" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="135" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="165" rx="1" ry="1" width="77%" height="25" />

        <rect x="0" y="210" rx="1" ry="1" width="28%" height="85" />
        <rect x="30%" y="210" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="240" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="270" rx="1" ry="1" width="77%" height="25" />

        <rect x="0" y="315" rx="1" ry="1" width="28%" height="85" />
        <rect x="30%" y="315" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="345" rx="1" ry="1" width="77%" height="25" />
        <rect x="30%" y="375" rx="1" ry="1" width="77%" height="25" />
      </ContentLoader>
    </div>
  );
}
