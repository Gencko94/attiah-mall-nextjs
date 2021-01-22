import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { CartAndWishlistProvider } from '../../../../contexts/CartAndWishlistContext';
import MobileGuestCartContainer from './MobileGuestCartContainer';
import MobileGuestCheckoutSection from './MobileGuestCheckoutSection';

export default function MobileGuestCart({ setCheckOutPopupOpen }) {
  const {
    guestCartItems,
    guestCartTotal,
    guestCartItemsLoading,
    isGuestGetCartError,
  } = React.useContext(CartAndWishlistProvider);
  const { t } = useTranslation();
  if (isGuestGetCartError) {
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
      <MobileGuestCheckoutSection setCheckOutPopupOpen={setCheckOutPopupOpen} />
      <MobileGuestCartContainer
        cartTotal={guestCartTotal}
        cartItems={guestCartItems}
        cartItemsLoading={guestCartItemsLoading}
      />
    </>
  );
}
