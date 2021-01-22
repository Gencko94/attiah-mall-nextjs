import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function CartLoader() {
  return (
    <div
      style={{ minHeight: 'calc(-120px + 100vh)' }}
      className="flex items-center justify-center"
    >
      <Loader type="ThreeDots" color="#b72b2b" height={40} width={40} visible />
    </div>
  );
}
