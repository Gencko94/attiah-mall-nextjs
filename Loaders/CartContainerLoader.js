import React from 'react';
import ContentLoader from 'react-content-loader';

export default function CartContainerLoader({ locale }) {
  return (
    <div className=" grid grid-cols-1">
      {[0, 1, 2, 3, 4].map(i => {
        return (
          <ContentLoader
            key={i}
            speed={6}
            viewBox="0 0 400 56"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            rtl={locale === 'ar'}
            style={{ alignSelf: 'flex-start' }}
          >
            <rect x="0" y="0" rx="1" ry="1" width="22%" height="56" />
            <rect x="23%" y="0" rx="1" ry="1" width="77%" height="16" />
            <rect x="23%" y="20px" rx="1" ry="1" width="77%" height="16" />
            <rect x="23%" y="40px" rx="1" ry="1" width="77%" height="16" />
          </ContentLoader>
        );
      })}
    </div>
  );
}
