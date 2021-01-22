import React from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { MdLocationOn } from 'react-icons/md';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import { calculateDiscountPrice } from '../../../utils/calculateDiscountPrice';
import RelatedItems from '../RelatedItems/RelatedItems';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';

export default function ItemDescription({
  data,
  handleAddToCart,
  itemInCart,
  quantity,
  setQuantity,
  addToCartButtonLoading,
  userId,
  setDetailsTab,
  reviewsLoading,
  ratingCount,
  averageRating,
}) {
  const qty = data.simple_addons.quantity;
  const isSale = data.simple_addons.promotion_price ? true : false;
  const {
    removeFromWishListMutation,
    addToWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const { locale } = useRouter();
  const { t } = useTranslation();

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
  const handleAddToWishlist = async () => {
    if (!userId) {
      return;
    }
    try {
      await addToWishListMutation({ id: data.id, userId });
      setItemInWishList(true);
    } catch (error) {
      setItemInWishList(true);
    }
  };
  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishListMutation({ id: data.id, userId });
      setItemInWishList(false);
    } catch (error) {}
  };
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };
  const handleChangeQuantity = e => {
    if (e.target.value < 1) {
      return;
    }
    setQuantity(e.target.value);
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
        <div className="flex items-center mb-1">
          <div className="flex items-center text-gray-600 text-sm">
            <h1 className="text-gray-600 text-sm">
              {t`products:model-number`} :
            </h1>
            <h1 className="mx-1">{data.simple_addons.sku}</h1>
          </div>
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
      </div>

      <h1 className=" font-semibold mb-1">
        {qty < 5 ? (
          formatItemsPlural(qty)
        ) : (
          <span className="text-green-700">{t`common:in-stock`}</span>
        )}
      </h1>

      <hr className="my-2" />
      <div className=" my-2 " style={{ fontWeight: '900' }}>
        {isSale && (
          <div className="flex flex-wrap items-center">
            <h1 className=" ">{t`products:price-before`} :</h1>
            <h1 className=" italic mx-2 text-xl  line-through text-gray-700">
              {(
                data.simple_addons.price * deliveryCountry?.currency.value
              ).toFixed(3)}{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </h1>
          </div>
        )}
        <div className="flex flex-wrap items-center">
          <h1 className="">
            {isSale ? t`products:price-now` : t`common:price`}:
          </h1>
          <h1 className=" text-xl mx-2 text-main-color">
            {isSale
              ? (
                  data.simple_addons.promotion_price *
                  deliveryCountry?.currency.value
                ).toFixed(3)
              : (
                  data.simple_addons.price * deliveryCountry?.currency.value
                ).toFixed(3)}{' '}
            {deliveryCountry?.currency.translation[locale].symbol}
          </h1>
          <h1 className=" font-normal text-xs  text-gray-700 uppercase">
            ({t`products:vat-inclusive`})
          </h1>
        </div>

        {isSale && (
          <h1 className="">
            {t`products:you-save`} :
            <span className=" text-lg mx-1 text-main-color">
              {calculateDiscountPrice(
                data.simple_addons.price,
                data.simple_addons.promotion_price
              )}
            </span>
          </h1>
        )}
      </div>

      <hr className="my-2" />
      <div className="mb-2">
        <div className="flex items-center font-semibold ">
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
          onClick={() => {
            if (itemInCart) {
              return;
            }
            handleAddToCart();
          }}
          disabled={qty === 0}
          className={`${
            qty === 0 ? 'bg-main-color ' : 'bg-green-700'
          } text-main-text text-sm  p-2 mx-1 rounded uppercase whitespace-no-wrap flex-1 flex items-center justify-center font-semibold`}
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
              <h1 className="mx-1 whitespace-no-wrap">
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
          onClick={() => {
            if (itemInWishList) {
              handleRemoveFromWishlist();
            } else {
              handleAddToWishlist();
            }
          }}
          className={`border
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
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
      <hr className="my-2" />
      {data?.related_products.length > 0 && (
        <RelatedItems data={data.related_products} />
      )}
    </div>
  );
}
