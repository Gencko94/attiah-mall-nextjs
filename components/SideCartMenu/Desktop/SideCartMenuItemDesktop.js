import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';

export default function SideCartMenuItemDesktop({ item, setSideMenuOpen }) {
  const {
    removeFromCartMutation,
    removeFromGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [
    removeFromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const { userId } = React.useContext(AuthProvider);
  const handleRemoveFromCart = async () => {
    setRemoveFromCartButtonLoading(true);
    try {
      if (userId) {
        const { id } = item;
        const { cart_id } = item;
        await removeFromCartMutation({
          id,
          cart_id,
          userId,
          deliveryCountry,
          coupon,
        });
        setRemoveFromCartButtonLoading(false);
      } else {
        const { sku } = item.options;
        await removeFromGuestCartMutation({ sku, deliveryCountry, coupon });
        setRemoveFromCartButtonLoading(false);
      }
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
    }
  };

  const cartItemVariant = {
    hidden: {
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
    },
    visible: {
      x: '0',
      delay: 3,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exited"
      variants={cartItemVariant}
      className=" side-cart-menu__item mb-2 "
    >
      <Link href={`products/${item.slug}/${item.id}`}>
        <a
          role="presentation"
          className="block relative"
          style={{ paddingBottom: 'calc(100% * 210/210)' }}
          onClick={() => setSideMenuOpen(false)}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${item.image}`}
            alt={item[`name_${locale}`]}
            layout="fill"
          />
        </a>
      </Link>

      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          href={`/products/${item.slug}/${item.id}`}
          onClick={() => setSideMenuOpen(false)}
        >
          <a className="text-clamp-2 text-sm uppercase hover:underline font-semibold">
            {`${item[`name_${locale}`]}`}
          </a>
        </Link>
        <div className="flex items-center text-gray-700">
          <div className="flex items-center">
            <h1 className="text-xs font-semibold">{t`common:price`}</h1>
            <h1 className="text-xs font-bold mx-1">
              {item.total}{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </h1>
          </div>
          <div className="flex items-center text-xs mx-2">
            <h1 className="font-semibold">{t`common:qty`} :</h1>
            <h1 className="mx-1 font-bold">{item.qty}</h1>
          </div>
        </div>
        <div>
          <button
            className={`
                bg-main-color text-main-text
            text-xs rounded p-1 my-1 flex uppercase items-center font-semibold justify-center `}
            style={{ width: '140px' }}
            onClick={handleRemoveFromCart}
          >
            {removeFromCartButtonLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={18}
                width={18}
                visible
              />
            ) : (
              t`common:remove-from-cart`
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
