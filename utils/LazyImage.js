import React from 'react';
// import itemplaceholder from '../assets/imgplaceholder.png';
export default function LazyImage({ src, pb, alt, origin, placeholder }) {
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
          bottom: 0,
          top: 0,
        }}
        className="m-auto absolute "
      />
    </div>
  );
}
