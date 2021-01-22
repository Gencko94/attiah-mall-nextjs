import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import MobileCartContainerLoader from '../../../../Loaders/MobileCartContainerLoader';
import CartEmptyMobile from '../CartEmptyMobile';
import GuestCartItemMobile from './GuestCartItemMobile';

export default function MobileGuestCartContainer({
  cartItemsLoading,
  cartItems,
}) {
  const { t } = useTranslation();
  if (cartItemsLoading) {
    return <MobileCartContainerLoader />;
  }
  return (
    <div>
      {cartItems.length === 0 && (
        <AnimatePresence>
          {cartItems.length === 0 && <CartEmptyMobile />}
        </AnimatePresence>
      )}
      {cartItems.length !== 0 && (
        <AnimateSharedLayout>
          <motion.div initial={false} layout className="mb-2">
            <AnimatePresence>
              {cartItems.map(item => (
                <GuestCartItemMobile key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.h1 layout className="text-xs my-2 px-2">
            {t`cart:cart-tos`}
          </motion.h1>
          <motion.hr layout />
        </AnimateSharedLayout>
      )}
    </div>
  );
}
