import React from 'react';
import ContentLoader from 'react-content-loader';

export default function MobileCheckoutSectionLoader({ locale }) {
  return (
    <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
      <ContentLoader
        speed={3}
        viewBox="0 0 400 240"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        rtl={locale === 'ar'}
        style={{ alignSelf: 'flex-start' }}
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="53" />
        <rect x="0" y="62" rx="5" ry="5" width="100%" height="53" />
        <rect x="0" y="124" rx="5" ry="5" width="100%" height="53" />
        <rect x="0" y="186" rx="5" ry="5" width="100%" height="53" />
      </ContentLoader>
    </div>
  );
}
