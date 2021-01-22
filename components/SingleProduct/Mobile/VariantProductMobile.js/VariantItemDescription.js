import React from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { MdLocationOn } from 'react-icons/md';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { DataProvider } from '../../../../contexts/DataContext';
import Options from '../../Desktop/VariantSingleProduct/Options';
import Variants from '../../Desktop/VariantSingleProduct/Variants';
import VariantsOnly from '../../Desktop/VariantSingleProduct/VariantsOnly';
import { calculateDiscountPrice } from '../../../../utils/calculateDiscountPrice';
import RelatedItems from '../../RelatedItems/RelatedItems';
import Image from 'next/image';

export default function VariantItemDescription({
  data,
  handleAddToCart,
  itemInCart,
  itemInWishList,
  quantity,
  setQuantity,
  addToCartButtonLoading,
  handleAddToWishList,
  userId,
  setSelectedVariant,
  selectedVariation,
  selectedOption,
  setSelectedOption,
  setDetailsTab,
  reviewsLoading,
  ratingCount,
  averageRating,
  handleRemoveFromWishList,
}) {
  const { locale } = useRouter();
  const { t } = useTranslation();
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

  const { deliveryCountry } = React.useContext(DataProvider);
  const resolvePlural = () => {
    switch (ratingCount) {
      case 1:
        return t`products:one-rating`;

      case 2:
        return t`products:two-ratings`;

      case ratingCount > 10 && ratingCount:
        return t`products:more-than-10-ratings`;

      default:
        return t`products:ratings`;
    }
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
  const resolveOptions = React.useCallback(() => {
    const arr = [];
    if (data.new_variation_addons[selectedVariation].options) {
      arr.push(
        <Options
          key="options"
          options={data.new_variation_addons[selectedVariation].options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedVariation={selectedVariation}
        />,
        <Variants
          key="variants"
          variants={data.new_variation_addons}
          setSelectedVariant={setSelectedVariant}
          selectedOption={selectedOption}
          selectedVariation={selectedVariation}
        />
      );

      return arr;
    }
    arr.push(
      <VariantsOnly
        key="variantsOnly"
        variants={data.new_variation_addons}
        setSelectedVariant={setSelectedVariant}
        selectedVariation={selectedVariation}
      />
    );
    return arr;
  }, [
    data.new_variation_addons,
    selectedOption,
    selectedVariation,
    setSelectedOption,
    setSelectedVariant,
  ]);
  const addToWishList = () => {
    if (!userId) {
      return;
      // setTimeout(() => {
      //   setSnackBarOpen(false);
      // }, 5000);
      // return;
    }
    if (itemInWishList) {
      handleRemoveFromWishList(data.id);
    } else {
      handleAddToWishList();
    }
  };
  return (
    <div className="mb-3">
      <div className="flex items-center">
        {data.brand && (
          <>
            <Link href={`/brands/${data.brand?.slug}`}>
              <a className="relative" style={{ width: '70px', height: '63px' }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/original/${data.brand?.logo?.link}`}
                  alt={data.full_translation[locale].title}
                  layout="fill"
                />
              </a>
            </Link>
            <Link href={`/brands/${data.brand?.slug}`}>
              <a className="hover:underline font-semibold text-sm text-gray-700 uppercase">
                {data.brand?.translation[locale].name}
              </a>
            </Link>
          </>
        )}
      </div>
      <h1 className="font-semibold text-xl">
        {data.full_translation[locale].title}
      </h1>
      <div className="flex items-center ">
        <h1 className="text-sm   mb-1 text-gray-700">
          {t`products:model-number`} : {option.sku}
        </h1>

        {!reviewsLoading && ratingCount !== 0 && (
          <div
            role="presentation"
            onClick={() => {
              const element = document.getElementById('details');
              element.scrollIntoView({ behavior: 'smooth' });
              setDetailsTab(1);
            }}
            className="text-sm mx-2 flex items-center"
          >
            <div className="rounded p-1 text-xs bg-green-700 text-main-text cursor-pointer">
              {averageRating}
            </div>

            <div className="text-sm text-gray-600 flex items-center mx-1  hover:underline cursor-pointer">
              <h1 className="mx-1">
                ({ratingCount > 2 && ratingCount} {resolvePlural()})
              </h1>
            </div>
          </div>
        )}
      </div>

      <h1 className=" font-semibold mb-1">
        {option.quantity < 5 ? (
          formatItemsPlural(option.quantity)
        ) : (
          <span className="text-green-700">{t`common:in-stock`}</span>
        )}
      </h1>

      <hr className="my-2" />
      <div className="py-1">
        <div style={{ fontWeight: '900' }}>
          {isSale && (
            <div className=" flex items-center ">
              <h1>{t`products:price-before`} :</h1>
              <h1 className=" mx-2 text-base italic  line-through text-gray-700">
                {(option.price * deliveryCountry?.currency.value).toFixed(3)}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          )}
          <div className="">
            <div className="flex items-center flex-1">
              <h1 className="    ">
                {isSale ? t`products:price-now` : t`common:price`}
              </h1>
              <h1 className=" text-xl mx-2  text-red-700">
                {isSale
                  ? (
                      option.promotion_price * deliveryCountry?.currency.value
                    ).toFixed(3)
                  : (option.price * deliveryCountry?.currency.value).toFixed(3)}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" font-normal uppercase  text-gray-700">
                ({t`products:vat-inclusive`})
              </h1>
            </div>
            {isSale && (
              <div className="flex items-center   ">
                <h1> {t`products:you-save`} :</h1>
                <span className=" font-bold mx-1 text-main-color">
                  {calculateDiscountPrice(option.price, option.promotion_price)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-2" />
      <div className="mb-2">{resolveOptions()}</div>
      <hr className="my-2" />
      <div className="mb-2">
        <div className="flex items-center font-semibold  ">
          <div className="flex items-center">
            <h1>{t`common:deliver-to`}</h1>
            <h1 className="uppercase mx-1">
              {deliveryCountry?.translation[locale].name}
            </h1>
            <MdLocationOn className="w-6 h-6 text-main-color " />
          </div>
        </div>
        <div className="flex items-center mb-2">
          <h1 className="text-gray-700">{t`common:estimated-delivery`} :</h1>
          <h1 className="mx-1">
            {deliveryCountry?.delivery_time > 2 &&
              deliveryCountry.delivery_time}
            <span className="mx-1">{formatDaysPlural()}</span>
          </h1>
        </div>
      </div>
      <br />
      <div className="relative flex items-center flex-wrap">
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
        <button
          disabled={option.quantity === 0}
          onClick={() => {
            if (itemInCart) {
              return;
            }
            handleAddToCart(quantity, option.sku, currentPrice);
          }}
          className={`${
            option.quantity === 0 ? 'bg-main-color' : 'bg-green-700'
          } text-main-text text-sm p-2 mx-1 rounded uppercase whitespace-no-wrap flex-1 flex items-center justify-center font-semibold`}
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
              <h1 className="mx-1 whitespace-no-wrap">
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
        <button
          onClick={addToWishList}
          className="border text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold"
        >
          {itemInWishList ? (
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
      <hr className="my-4" />
      {data?.related_products.length > 0 && (
        <RelatedItems data={data.related_products} />
      )}
    </div>
  );
}
