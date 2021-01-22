import React from 'react';
import MobileNavbar from './NavbarMobile/MobileNavbar';

export default function Mobile({ children }) {
  return (
    <>
      <MobileNavbar />
      <div className="py-1 mx-2">{children}</div>
    </>
  );
}
