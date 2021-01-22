import React from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../Layouts/Layout';
import MainCarousel from '../components/MainCarousel';
import isMobile from '../utils/isMobile';
import SideCartMenuDesktop from '../components/SideCartMenu/Desktop/SideCartMenuDesktop';
import SideCartMenuMobile from '../components/SideCartMenu/Mobile/SideCartMenuMobile';

const StaticSwiper = dynamic(() => import('../components/StaticSwiper'), {
  ssr: false,
});

export default function Home() {
  const [cartMenuOpen, setCartMenu] = React.useState(false);
  const setCartMenuOpen = () => {
    setCartMenu(true);
  };
  const isMobileDevice = isMobile();
  return (
    <Layout>
      <AnimatePresence>
        {cartMenuOpen &&
          (isMobileDevice ? (
            <SideCartMenuMobile
              key="side-cart-mobile"
              setSideMenuOpen={setCartMenu}
            />
          ) : (
            <SideCartMenuDesktop
              key="side-cart-desktop"
              setSideMenuOpen={setCartMenu}
            />
          ))}
        {cartMenuOpen && (
          <motion.div
            key="sidecart-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartMenu(false)}
            className="side__addCart-bg"
          />
        )}
      </AnimatePresence>
      <div className="text-2xl">
        <MainCarousel />
        <StaticSwiper
          type="latest_products"
          title="New Arrivals"
          cb={setCartMenuOpen}
        />
        <StaticSwiper
          type="electrical-electronics"
          title="New Arrivals"
          cb={setCartMenuOpen}
        />
        <StaticSwiper
          type="perfumes"
          title="New Arrivals"
          cb={setCartMenuOpen}
        />
        <StaticSwiper
          type="personal-care-makeup"
          title="New Arrivals"
          cb={setCartMenuOpen}
        />
        <StaticSwiper type="babies" title="New Arrivals" cb={setCartMenuOpen} />
        <StaticSwiper type="toys-1" title="New Arrivals" cb={setCartMenuOpen} />
        <StaticSwiper
          type="kitchen-dinning"
          title="New Arrivals"
          cb={setCartMenuOpen}
        />
      </div>
    </Layout>
  );
}
