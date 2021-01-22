import React from 'react';
import NavLogoDesktop from './NavLogoDesktop';
import SearchBarDesktop from './SearchBarDesktop';
import NavIconsDesktop from './NavIconsDesktop';

export default function SecondNav() {
  return (
    <div className="z-20 sticky top-0 left-0 bg-main-color text-main-text py-2">
      <div className="max-w-default mx-auto flex items-center  justify-between px-6">
        <NavLogoDesktop />
        <SearchBarDesktop />
        <NavIconsDesktop />
      </div>
    </div>
  );
}
