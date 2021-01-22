import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';

export default function NavIconsDesktop() {
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const { locale } = useRouter();
  const { t } = useTranslation();
  const {
    cartItemsLoading,
    guestCartItemsLoading,
    cartItems,
    guestCartItems,
    wishlistItems,
    wishlistItemsLoading,
  } = React.useContext(CartAndWishlistProvider);
  const resolveCartLength = () => {
    if (authenticationLoading || cartItemsLoading || guestCartItemsLoading) {
      return <Loader type="TailSpin" color="#b72b2b" height={12} width={12} />;
    }
    if (!authenticationLoading && userId) {
      return cartItems.length;
    }
    return guestCartItems.length;
  };
  const resolveWishlist = () => {
    if (authenticationLoading || wishlistItemsLoading) {
      return (
        <span
          className={`absolute ${
            locale === 'ar' ? 'left-0' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
          bg-body-light text-main-color
      `}
        >
          <Loader type="TailSpin" color="#b72b2b" height={12} width={12} />
        </span>
      );
    }
    if (!authenticationLoading && userId) {
      return (
        <span
          className={`absolute ${
            locale === 'ar' ? 'left-0' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
          text-main-color bg-body-light
         
      `}
        >
          {wishlistItems.length}
        </span>
      );
    }
    if (!authenticationLoading && !userId) {
      return (
        <span
          className={`absolute ${
            locale === 'ar' ? 'left-0' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
           text-main-color bg-body-light`}
        >
          0
        </span>
      );
    }
  };
  return (
    <div
      className="flex items-center justify-evenly"
      style={{ flexBasis: '220px' }}
    >
      <Link href="/cart">
        <a className="flex p-1  items-center font-semibold   relative">
          <h1 className=" text-sm ">{t`common:cart`}</h1>
          <HiOutlineShoppingBag className="w-7 h-7 mx-1 " />
          <span
            className={`absolute ${
              locale === 'ar' ? 'left-0' : 'right-0'
            } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center bg-body-light text-main-color
          `}
          >
            {resolveCartLength()}
          </span>
        </a>
      </Link>
      <Link href="/wishlist">
        <a className="flex p-1  items-center font-semibold   relative">
          <h1 className=" text-sm ">{t`common:wishlist`}</h1>
          <AiOutlineHeart className="w-7 h-7 mx-1 " />
          {resolveWishlist()}
        </a>
      </Link>
    </div>
  );
}
