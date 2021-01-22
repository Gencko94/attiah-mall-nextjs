import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { CartAndWishlistProvider } from '../../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../../contexts/DataContext';
import CartContainerLoader from '../../../../Loaders/CartContainerLoader';
import CartEmpty from '../CartEmpty';
import GuestCartItem from './GuestCartItem';

export default function GuestCartContainer() {
  const {
    guestCartItems,
    guestCartTotal,
    guestCartItemsLoading,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const resolvePlural = () => {
    switch (guestCartItems.length) {
      case 1:
        return t`common:one-item`;

      case 2:
        return t`common:two-items`;

      case guestCartItems.length > 10 && guestCartItems.length:
        return t`common:more-than-10-items`;
      default:
        return t`common:multiple-items`;
    }
  };
  if (guestCartItemsLoading) {
    return <CartContainerLoader locale={locale} />;
  }
  return (
    <div className="text-body-text-light">
      <AnimatePresence>
        {guestCartItems.length === 0 && <CartEmpty />}
      </AnimatePresence>
      {guestCartItems.length !== 0 && (
        <>
          <div className="cart-grid-titles font-semibold text-lg">
            <div />
            <h1 className="  ">{t`common:the-item`}</h1>
            <h1 className="text-center">{t`common:price`}</h1>
            <h1 className="text-center">{t`common:total`}</h1>
          </div>
          <hr />
          <AnimateSharedLayout>
            <motion.div
              initial={false}
              layout
              className=" grid grid-cols-1 gap-2"
            >
              <AnimatePresence>
                {guestCartItems.map(item => {
                  return <GuestCartItem key={item.options.sku} item={item} />;
                })}
              </AnimatePresence>
            </motion.div>

            <motion.div
              layout
              className="flex justify-end p-2 rounded mt-2 border bg-gray-100"
              style={{ fontWeight: '900' }}
            >
              <h1>{t`common:cart-total`}</h1>
              <h1 className="mx-1 whitespace-no-wrap ">
                (
                {locale === 'ar'
                  ? guestCartItems.length > 2 && guestCartItems.length
                  : `${guestCartItems.length} `}
                {resolvePlural()})
              </h1>
              <h1>{guestCartTotal}</h1>{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </motion.div>
            <motion.div layout className="text-sm my-4">
              <h1>{t`cart:cart-tos`}</h1>
            </motion.div>
          </AnimateSharedLayout>
        </>
      )}

      <hr />
    </div>
  );
}
