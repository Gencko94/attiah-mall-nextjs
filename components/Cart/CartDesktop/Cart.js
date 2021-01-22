import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

import StaticSwiper from '../../StaticSwiper';
import CartLoader from '../../../Loaders/CartLoader';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { AuthProvider } from '../../../contexts/AuthContext';
import CheckoutModal from './CheckoutModal';
import CartContainer from './CartContainer';
import CartRightSide from './CartRightSide';
import GuestCart from './GuestCart/GuestCart';

export default function Cart() {
  const { cartItemsLoading, isGetCartError } = React.useContext(
    CartAndWishlistProvider
  );
  const { t } = useTranslation();
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);

  if (!cartItemsLoading && isGetCartError) {
    return (
      <div className="px-4 py-2 max-w-default mx-auto min-h-screen">
        <h1>{t`common:something-went-wrong-snackbar`}</h1>
      </div>
    );
  }
  return (
    <>
      <AnimatePresence>
        {checkoutModalOpen && (
          <CheckoutModal setCheckOutModalOpen={setCheckOutModalOpen} />
        )}
      </AnimatePresence>
      {authenticationLoading && <CartLoader />}
      {!authenticationLoading && userId && !isGetCartError && (
        <div className="cart-main-grid">
          <CartContainer />
          <CartRightSide setCheckOutModalOpen={setCheckOutModalOpen} />
        </div>
      )}
      {!authenticationLoading && !userId && (
        <GuestCart setCheckOutModalOpen={setCheckOutModalOpen} />
      )}
      <StaticSwiper
        title="Perfumes"
        type="perfumes"
        cb={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      />
    </>
  );
}
