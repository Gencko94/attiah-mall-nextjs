import React from 'react';
import DesktopNavbar from './NavbarDesktop/DesktopNavbar';

export default function Desktop({ children }) {
  return (
    <>
      <DesktopNavbar />
      <div className="max-w-default px-6 py-3 mx-auto">{children}</div>
    </>
  );
}
