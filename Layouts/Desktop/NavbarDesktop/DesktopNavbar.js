import { useRouter } from 'next/router';
import React from 'react';
import FirstNav from './FirstNav';
import NavCategory from './NavCategory';
import SecondNav from './SecondNav';

export default function DesktopNavbar() {
  const { pathname } = useRouter();
  const specialPages =
    pathname.includes('/user/account') ||
    pathname.includes('/checkout/guest-checkout') ||
    pathname.includes('/checkout/user-checkout') ||
    pathname.includes('/checkout') ||
    pathname.includes('/order/track');

  return (
    <>
      <FirstNav />
      <SecondNav />
      {!specialPages && hideAllCategories && <NavCategory />}
    </>
  );
}
