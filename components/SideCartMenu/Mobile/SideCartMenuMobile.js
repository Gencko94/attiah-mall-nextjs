import { AnimatePresence, motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import SideCartMenuItemMobile from './SideCartMenuItemMobile';

export default function SideCartMenuMobile({ setSideMenuOpen }) {
  const {
    sideCartItems,
    sideCartSubTotal,
    sideCartCouponCost,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const handleCloseMenu = () => {
    setSideMenuOpen(false);
  };

  const sideMenuVariants = {
    hidden: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
      opacity: 0,
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
      transition: {
        when: 'afterChildren',
        type: 'tween',
      },
    },
  };
  React.useEffect(() => {
    // if (orderDetailsOpen) {
    document.body.style.overflow = 'hidden';
    // }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <motion.div
      variants={sideMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`side-add-to-cart__container-mobile ${
        locale === 'ar' ? 'right-0' : 'left-0'
      } `}
    >
      <div className=" bg-body-light p-2 h-full flex flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">{t`common:cart`}</h1>
          <button onClick={handleCloseMenu}>
            <MdClose className="w-5 h-5 " />
          </button>
        </div>
        <hr className="my-2" />
        {sideCartItems.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <img src="/cartEmpty.png" alt="Empty cart" />
            <h1 className="font-bold mb-2">{t`common:cart-empty`}</h1>
          </div>
        )}
        {sideCartItems.length !== 0 && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {sideCartItems.map(item => {
                return (
                  <SideCartMenuItemMobile
                    key={item.options.sku}
                    item={item}
                    setSideMenuOpen={setSideMenuOpen}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        )}
        <hr className="my-1" />
        {sideCartItems.length !== 0 && (
          <div>
            {sideCartCouponCost !== '0.000' && (
              <div className="flex text-green-700 justify-between semibold items-center  my-2">
                <h1 className="font-bold ">{t`common:coupon-sale`}</h1>
                <h1 className=" font-bold">
                  {sideCartCouponCost}{' '}
                  {deliveryCountry?.currency.translation[locale].symbol}
                </h1>
              </div>
            )}
            <div className="flex justify-between semibold items-center  my-2">
              <h1 className="font-bold">{t`common:subtotal`}</h1>
              <h1 className=" font-bold">
                {sideCartSubTotal}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
            <hr className="my-1" />
            <div className=" flex items-center my-2 text-center text-main-text ">
              <Link href="/cart">
                <a className="flex-1 py-2 px-3 border font-semibold border-main-color text-main-color mx-1 hover:bg-main-color hover:text-main-text uppercase transition duration-150   rounded">
                  {t`common:go-to-cart`}
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
