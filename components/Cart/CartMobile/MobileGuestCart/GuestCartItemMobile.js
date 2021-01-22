import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { CartAndWishlistProvider } from '../../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../../contexts/DataContext';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function GuestCartItemMobile({ item }) {
  const {
    removeFromGuestCartMutation,
    editGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [quantity, setQuantity] = React.useState(item.qty);
  const [editLoading, setEditLoading] = React.useState(false);
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const { t } = useTranslation();
  const { locale } = useRouter();
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
  const handleChangeQuantity = e => {
    if (e.target.value < 1) {
      return;
    }
    if (e.target.value > item.options.max_quantity) {
      return;
    }
    setQuantity(e.target.value);
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

  const handleRemoveItemFromCart = async sku => {
    setRemoveFromCartButtonLoading(true);
    try {
      await removeFromGuestCartMutation({ sku, deliveryCountry, coupon });
      setRemoveFromCartButtonLoading(false);
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
    }
  };
  const handleEditItemFromCart = async (sku, price) => {
    if (
      quantity > item.options.max_quantity ||
      quantity === 0 ||
      item.qty === quantity
    )
      return;
    setEditLoading(true);
    try {
      await editGuestCartMutation({
        sku,
        quantity,
        price,
        deliveryCountry,
        coupon,
      });
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
    }
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
          <div
            className="text-main-color text-base"
            style={{ fontWeight: '900' }}
          >
            {item.total} {deliveryCountry?.currency.translation[locale].symbol}
          </div>
          <div className=" flex items-center flex-wrap ">
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
                type="number"
                value={quantity}
                onChange={handleChangeQuantity}
                className="mx-1 px-2 py-1 border rounded"
                style={{ maxWidth: '40px', textAlign: 'center' }}
              />
              <button onClick={handleAddQuantity} className="p-1">
                <AiOutlinePlusCircle className="w-6 h-6 text-blue-700" />
              </button>
            </div>

            <button
              onClick={() =>
                handleEditItemFromCart(item.options.sku, item.price)
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
                  height={18}
                  width={18}
                  visible
                />
              ) : (
                t`cart:update-btn`
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromCart(item.options.sku);
          }}
          className={`
              bg-main-color
            text-main-text text-sm flex items-center relative justify-center flex-1 p-2 rounded uppercase  font-semibold`}
        >
          {removefromCartButtonLoading === item.id ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={22}
              width={22}
              visible
            />
          ) : (
            <h1 className="mx-2 whitespace-no-wrap">
              {t`common:remove-from-cart`}
            </h1>
          )}
        </button>
      </div>
    </motion.div>
  );
}
