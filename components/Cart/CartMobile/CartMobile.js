import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import MobileCartLoader from '../../../Loaders/MobileCartLoader';
import MobileCheckoutSection from './MobileCheckoutSection';
import { AuthProvider } from '../../../contexts/AuthContext';
import StaticSwiper from '../../StaticSwiper';
import CartEmptyMobile from './CartEmptyMobile';
import CheckoutPopupMobile from './CheckoutPopupMobile';
import MobileCartContainer from './MobileCartContainer';
import MobileGuestCart from './MobileGuestCart/MobileGuestCart';

export default function CartMobile() {
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const { t } = useTranslation();
  const [checkoutPopupOpen, setCheckOutPopupOpen] = React.useState(false);
  const {
    cartItems,
    cartMessage,
    cartItemsLoading,
    isGetCartError,
  } = React.useContext(CartAndWishlistProvider);

  if (isGetCartError) {
    return (
      <div
        className="py-1 mx-2 flex items-center justify-center"
        style={{ minHeight: 'calc(-80px + 100vh)' }}
      >
        <h1>{t`common:something-went-wrong-snackbar`}</h1>
      </div>
    );
  }
  return (
    <>
      <AnimatePresence>
        {checkoutPopupOpen && (
          <CheckoutPopupMobile setCheckOutPopupOpen={setCheckOutPopupOpen} />
        )}
      </AnimatePresence>

      {authenticationLoading && <MobileCartLoader />}
      <AnimatePresence>
        {!authenticationLoading &&
          userId &&
          !cartItemsLoading &&
          !isGetCartError &&
          cartItems.length === 0 && <CartEmptyMobile />}
      </AnimatePresence>
      {!authenticationLoading &&
        userId &&
        !isGetCartError &&
        cartItems?.length !== 0 && (
          <>
            <MobileCheckoutSection />
            <MobileCartContainer
              cartItems={cartItems}
              cartItemsLoading={cartItemsLoading}
              cartMessage={cartMessage}
            />
          </>
        )}
      {!authenticationLoading && !userId && (
        <MobileGuestCart setCheckOutPopupOpen={setCheckOutPopupOpen} />
      )}

      <StaticSwiper
        type="perfumes"
        title="Perfumes"
        cb={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </>
  );
}
