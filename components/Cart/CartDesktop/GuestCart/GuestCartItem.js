import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CartAndWishlistProvider } from '../../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../../contexts/DataContext';

export default function GuestCartItem({ item }) {
  const { deliveryCountry } = React.useContext(DataProvider);
  const {
    removeFromGuestCartMutation,
    editGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);

  const [quantity, setQuantity] = React.useState(item.qty);
  const [editLoading, setEditLoading] = React.useState(false);

  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const { t } = useTranslation();
  const { locale } = useRouter;
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
  const handleRemoveItemFromCart = async sku => {
    setRemoveFromCartButtonLoading(true);
    try {
      await removeFromGuestCartMutation({ sku, deliveryCountry, coupon });
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
    }
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
      className="cart-item py-2 border-b"
    >
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
      <div className="">
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
        <h1 className=" font-semibold text-sm mb-1">
          {item.options.max_quantity < 5 ? (
            formatItemsPlural(item.options.max_quantity)
          ) : (
            <span className="text-green-700">{t`common:in-stock`}</span>
          )}
        </h1>
        <div className="flex items-center mb-2 ">
          <h1 className=" font-semibold">{t`common:quantity`}</h1>
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
              style={{ maxWidth: '50px', textAlign: 'center' }}
            />
            <button onClick={handleAddQuantity} className="p-1">
              <AiOutlinePlusCircle className="w-6 h-6 text-blue-700" />
            </button>
          </div>
          <button
            onClick={() => handleEditItemFromCart(item.options.sku, item.price)}
            style={{ width: '50px' }}
            disabled={
              quantity > item.options.max_quantity ||
              quantity === 0 ||
              item.qty === quantity
            }
            className={`p-1 flex items-center justify-center text-xs rounded ${
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
        <div className="flex text-sm  items-center ">
          <button
            onClick={() => {
              handleRemoveItemFromCart(item.options.sku, item.price);
            }}
            className={`bg-main-color
             text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase `}
            style={{ width: '200px' }}
            disabled={removefromCartButtonLoading}
          >
            {removefromCartButtonLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={21}
                width={21}
                visible={removefromCartButtonLoading}
              />
            ) : (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {t`common:remove-from-cart`}
                </h1>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="text-center" style={{ fontWeight: '900' }}>
        {item.price} {deliveryCountry?.currency.translation[locale].symbol}
        {item.message && (
          <h1 className="text-main-color text-xs">
            ({t`cart:${item.message}`})
          </h1>
        )}
      </div>
      <div className="text-center " style={{ fontWeight: '900' }}>
        {item.total} {deliveryCountry?.currency.translation[locale].symbol}
      </div>
    </motion.div>
  );
}
