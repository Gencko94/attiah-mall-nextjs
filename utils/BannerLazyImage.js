import React from 'react';
// import { isMobileDevice } from 'react-select/src/utils';
// import desktopplaceholder from '../assets/DesktopBannerPlaceholder.png';
// import mobileplaceholder from '../assets/MobileBannerPlaceholder.png';

export default function BannerLazyImage({ src, pb, alt, origin }) {
  // const isMobile = isMobileDevice();
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        paddingBottom: pb,
        width: '100%',
      }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${
          origin || 'original'
        }/${src}`}
        alt={alt}
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
          display: 'block',
          left: 0,
          right: 0,
        }}
        className="mx-auto my-0 absolute"
      />
    </div>
  );
}
