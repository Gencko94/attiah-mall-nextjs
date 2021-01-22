import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';

export default function CartItemMobile({ item }) {
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const [itemInWishlist, setItemInWishlist] = React.useState(false);
  const {
    editCartMutation,
    addToWishListMutation,
    removeFromWishListMutation,
    removeFromCartMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { userId } = React.useContext(AuthProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [quantity, setQuantity] = React.useState(item.qty);
  const [editLoading, setEditLoading] = React.useState(false);
  const { locale } = useRouter();
  const { t } = useTranslation();
  const formatItemsPlural = n => {
    switch (n) {
      case 0:
        return (
          <span className="text-main-color">{t`common:no-items-left`}</span>
        );
      case 1:
        return (
          <span className="text-yellow-700">{t`common:one-item-left`}</span>
        );

      case 2:
        return (
          <span className="text-yellow-700">{t`common:two-items-left`}</span>
        );

      default:
        return (
          <span className=" text-yellow-700">
            {n} {t`common:items-left`}
          </span>
        );
    }
  };
  const handleSubstractQuantity = () => {
    // eslint-disable-next-line radix
    if (parseInt(quantity) === 1) {
      return;
    }
    // eslint-disable-next-line radix
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    // eslint-disable-next-line radix
    setQuantity(parseInt(quantity) + 1);
  };
  const handleChangeQuantity = e => {
    if (e.target.value < 1) {
      return;
    }
    if (e.target.value > item.options.max_quantity) {
      return;
    }
    setQuantity(e.target.value);
  };
  const handleRemoveItemFromCart = async (id, cart_id) => {
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, userId, cart_id, deliveryCountry });
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
    }
  };
  const handleEditItemFromCart = async (cartId, itemId, quantity) => {
    if (
      quantity > item.options.max_quantity ||
      quantity === 0 ||
      item.qty === quantity
    )
      return;
    setEditLoading(true);
    try {
      await editCartMutation({ cartId, itemId, userId, quantity });
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
    }
  };
  const handleRemoveItemFromWishlist = async id => {
    try {
      await removeFromWishListMutation({ id, userId });

      setItemInWishlist(false);
    } catch (error) {}
  };
  const handleAddItemToWishlist = async item => {
    try {
      await addToWishListMutation({ id: item.id, userId });
      setItemInWishlist(true);
    } catch (error) {}
  };
  const variant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
  return (
    <motion.div
      layout
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="border-b "
    >
      <div className="py-2 cart__item-mobile">
        <Link href={`/products/${item.slug}/${item.id}`}>
          <a
            className="block relative"
            style={{ paddingBottom: 'calc(100% * 266/210)' }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${item.image}`}
              alt={item[`name_${locale}`]}
              layout="fill"
            />
          </a>
        </Link>
        <div className="text-sm">
          <Link href={`/products/${item.slug}/${item.id}`}>
            <a>
              <h1 className="font-semibold ">
                {`${item[`name_${locale}`]}${
                  item.options.addons
                    ? ` - ${Object.keys(item.options.addons)
                        .map(variation => item.options.addons[variation])
                        .join(' - ')}`
                    : ''
                }`}
              </h1>
            </a>
          </Link>
          <h1 className=" font-semibold">
            {item.options.max_quantity < 5 ? (
              formatItemsPlural(item.options.max_quantity)
            ) : (
              <span className="text-green-700">{t`common:in-stock`}</span>
            )}
          </h1>
          <div className="" style={{ fontWeight: '900' }}>
            <div className="flex items-center">
              <h1>{t`common:price`} </h1>
              <span className="mx-1">
                {item.price}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </div>
          </div>
          <div
            className="text-green-700 text-base"
            style={{ fontWeight: '900' }}
          >
            <div className="flex items-center">
              <h1>{t`common:total`} </h1>
              <span className="mx-1">
                {item.total}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </div>
          </div>
          <div className=" flex items-center flex-wrap text-base ">
            <h1 className=" font-semibold">{t`common:quantity`} : </h1>
            <div className=" flex items-center justify-center mx-3">
              <button onClick={handleSubstractQuantity} className="p-1">
                <AiOutlineMinusCircle
                  className={`w-6 h-6 ${
                    quantity === 1 ? 'text-gray-700' : 'text-blue-700'
                  }`}
                />
              </button>
              <input
                value={quantity}
                type="number"
                onChange={handleChangeQuantity}
                className="mx-1 px-2 py-1 border rounded"
                style={{ maxWidth: '40px', textAlign: 'center' }}
              />
              <button onClick={handleAddQuantity} className="p-1">
                <AiOutlinePlusCircle className="w-6 h-6 text-blue-700" />
              </button>
            </div>
          </div>
          <button
            onClick={() =>
              handleEditItemFromCart(item.cart_id, item.id, quantity)
            }
            style={{ width: '50px' }}
            disabled={
              quantity > item.options.max_quantity ||
              quantity === 0 ||
              item.qty === quantity
            }
            className={`p-1 flex items-center justify-center text-xs rounded mt-1 ${
              quantity > item.options.max_quantity ||
              quantity === 0 ||
              item.qty === quantity
                ? 'bg-gray-600 text-gray-400'
                : 'bg-main-color text-main-text'
            }`}
          >
            {editLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={20}
                width={20}
                visible={editLoading}
              />
            ) : (
              t`cart:update-btn`
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromCart(item.id, item.cart_id);
          }}
          className={`bg-main-color
            text-main-text text-sm flex items-center relative justify-center flex-1 p-2 rounded uppercase  font-semibold`}
        >
          {removefromCartButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={22}
              width={22}
              visible={removefromCartButtonLoading}
            />
          ) : (
            <h1 className="mx-2 whitespace-no-wrap">
              {t`common:remove-from-cart`}
            </h1>
          )}
        </button>
        <button
          onClick={() => {
            if (itemInWishlist) {
              handleRemoveItemFromWishlist(item.id);
            } else {
              handleAddItemToWishlist(item);
            }
          }}
          className={`
              border mx-2
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
        >
          {itemInWishlist ? (
            <AiFillHeart
              className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
            />
          ) : (
            <AiOutlineHeart
              className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
            />
          )}
        </button>
      </div>
    </motion.div>
  );
}
