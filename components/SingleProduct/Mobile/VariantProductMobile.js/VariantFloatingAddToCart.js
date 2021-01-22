import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { DataProvider } from '../../../../contexts/DataContext';

export default function VariantFloatingAddToCart({
  quantity,
  setQuantity,
  itemInCart,
  handleAddToCart,
  data,
  addToCartButtonLoading,
  selectedOption,
  selectedVariation,
}) {
  const { deliveryCountry } = React.useContext(DataProvider);
  const { locale } = useRouter();
  const { t } = useTranslation();
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };
  const variantOnly = data.new_variation_addons[selectedVariation].options
    ? false
    : true;
  const option = variantOnly
    ? data.new_variation_addons[selectedVariation]
    : data.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ];
  const isSale = data.new_variation_addons[selectedVariation].options
    ? data.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ].promotion_price
      ? true
      : false
    : data.new_variation_addons[selectedVariation].promotion_price
    ? true
    : false;
  const currentPrice = isSale ? option.promotion_price : option.price;

  const variants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      y: '100%',
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="floating-button border-t bg-body-light"
    >
      <div className=" flex items-center justify-center">
        <button onClick={handleSubstractQuantity}>
          <AiOutlineMinusCircle
            className={`w-6 h-6 ${
              quantity === 1 ? 'text-gray-700' : 'text-blue-700'
            }`}
          />
        </button>
        <input
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="mx-1 px-2 py-1 border rounded"
          style={{ maxWidth: '40px', textAlign: 'center' }}
        />
        <button onClick={handleAddQuantity}>
          <AiOutlinePlusCircle className="w-6 h-6 text-blue-700" />
        </button>
      </div>

      <div className="p-1 text-center mx-1">
        {isSale ? quantity * option.promotion_price : quantity * option.price}
        <span className="mx-1">
          {deliveryCountry?.currency.translation[locale].symbol}
        </span>
      </div>

      <button
        disabled={option.quantity === 0}
        onClick={() => {
          if (itemInCart) {
            return;
          }
          handleAddToCart(quantity, option.sku, currentPrice);
        }}
        className={` ${
          option.quantity === 0 ? 'bg-main-color ' : 'bg-green-700'
        } whitespace-no-wrap flex-1 text-body-light uppercase text-sm py-2 px-2 rounded flex items-center justify-center font-semibold`}
      >
        {addToCartButtonLoading ? (
          <Loader
            type="ThreeDots"
            color="#fff"
            height={25}
            width={25}
            visible
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
        ) : option.quantity === 0 ? (
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
    </motion.div>
  );
}
