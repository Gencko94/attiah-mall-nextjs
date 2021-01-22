import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function MobileCartLoader() {
  return (
    <div
      className="py-1 mx-2 flex items-center justify-center"
      style={{ minHeight: 'calc(-80px + 100vh)' }}
    >
      <Loader type="ThreeDots" color="#b72b2b" height={30} width={30} />
    </div>
  );
}
