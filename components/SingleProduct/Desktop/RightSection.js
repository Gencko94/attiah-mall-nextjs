import React from 'react';
import {
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineLock,
} from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { TiShoppingCart } from 'react-icons/ti';
import { MdLocationOn } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { DataProvider } from '../../../contexts/DataContext';

export default function RightSection({
  handleAddToCart,
  addToCartButtonLoading,
  addToWishListButtonLoading,
  handleAddToWishList,
  itemInWishList,
  itemInCart,
  userId,
  qty,
}) {
  const [quantity, setQuantity] = React.useState(1);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const { deliveryCountry } = React.useContext(DataProvider);
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
    setQuantity(e.target.value);
  };
  const formatDaysPlural = () => {
    // eslint-disable-next-line radix
    switch (parseInt(deliveryCountry?.delivery_time)) {
      case 1:
        return t`products:one-day`;

      case 2:
        return t`products:two-days`;

      // eslint-disable-next-line radix
      case parseInt(
        deliveryCountry?.delivery_time > 10 && deliveryCountry?.delivery_time
      ):
        return t`products:more-than-10-days`;

      default:
        return t`products:days`;
    }
  };
  const addToWishList = () => {
    if (!userId) {
      setSnackBarOpen(true);
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 5000);
      return;
    }
    if (itemInWishList) {
      return;
    }
    handleAddToWishList();
  };
  return (
    <div
      className="border  p-2 rounded shadow-sm self-start sticky  "
      style={{ top: '108px' }}
    >
      <div className="rounded">
        <div className="flex items-center font-semibold">
          <div className="flex items-center">
            <h1>{t`common:deliver-to`}</h1>
            <h1 className="uppercase mx-1">
              {deliveryCountry?.translation[locale].name}
            </h1>
            <MdLocationOn className="w-5 h-5 text-main-color " />
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center">
            <h1 className="text-gray-700">{t`common:estimated-delivery`}</h1>
            <h1 className="mx-1">
              {deliveryCountry?.delivery_time > 2 &&
                deliveryCountry.delivery_time}
              <span className="mx-1">{formatDaysPlural()}</span>
            </h1>
          </div>
        </div>
      </div>

      <hr className="mb-2" />
      <div className=" mr-2 flex justify-center items-center mb-2">
        <h1 className=" mr-2 flex-1 font-semibold">{t`common:quantity`} : </h1>
        <div className=" flex items-center justify-center">
          <button onClick={handleSubstractQuantity} className="p-1">
            <AiOutlineMinusCircle
              className={`w-6 h-6 ${
                quantity === 1 ? 'text-gray-700' : 'text-blue-700'
              }`}
            />
          </button>
          <input
            value={quantity}
            onChange={handleChangeQuantity}
            className="mx-1 px-2 py-1 border rounded"
            style={{ maxWidth: '40px', textAlign: 'center' }}
          />
          <button onClick={handleAddQuantity} className="p-1">
            <AiOutlinePlusCircle className="w-6 h-6 text-blue-700" />
          </button>
        </div>
      </div>
      <hr />
      <div className="text-gray-700 flex items-center justify-center py-2">
        <h1 className="hover:underline cursor-pointer">
          {t`products:secure-transaction`}
        </h1>
        <AiOutlineLock className="h-5 w-5 mx-1 " />
      </div>
      <div className="flex flex-col relative">
        <button
          onClick={() => {
            if (itemInCart) {
              return;
            }
            handleAddToCart(quantity);
          }}
          disabled={qty === 0}
          className={`
            ${
              qty > 0
                ? 'bg-green-700 text-main-text'
                : 'bg-gray-500 text-gray-200 cursor-not-allowed'
            }
           flex-1   py-2 px-2 rounded mb-2   flex items-center justify-center font-semibold uppercase`}
        >
          {addToCartButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={25}
              width={25}
              visible={addToCartButtonLoading}
            />
          ) : itemInCart ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-2 whitespace-no-wrap">
                {t`common:added-to-cart`}
              </h1>
            </>
          ) : qty === 0 ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{t`common:out-of-stock`}</h1>
            </>
          ) : (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{t`common:add-to-cart`}</h1>
            </>
          )}
        </button>

        <button
          onClick={addToWishList}
          className={`
              border-main-color text-main-color border
           flex-1   py-2 px-2 rounded mb-2   flex items-center justify-center font-semibold uppercase`}
        >
          {addToWishListButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={25}
              width={25}
              visible={addToWishListButtonLoading}
            />
          ) : itemInWishList ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-2 whitespace-no-wrap">
                {t`common:added-to-wishlist`}
              </h1>
            </>
          ) : (
            <>
              <span>
                <AiOutlineHeart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{t`common:add-to-wishlist`}</h1>
            </>
          )}
        </button>
        <AnimatePresence>
          {snackBarOpen && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="box-arrow text-xs shadow text-center rounded p-2 "
            >
              Please log in to Add
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
