import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { DataProvider } from '../../../contexts/DataContext';
import { calculateDiscountPrice } from '../../../utils/calculateDiscountPrice';
import RelatedItems from '../RelatedItems/RelatedItems';

export default function MiddleSection({
  data,
  ratingCount,
  averageRating,
  reviewsLoading,
  setDetailsTab,
}) {
  const { t } = useTranslation();
  const { locale } = useRouter();
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
  return (
    <div className="flex flex-col w-full self-start ">
      <div className="flex items-center mb-1">
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
      <h1 className="font-semibold text-xl uppercase">
        {data.full_translation[locale].title}
      </h1>

      <h1 className=" font-semibold mb-1">
        {data.simple_addons.quantity < 5 ? (
          formatItemsPlural(data.simple_addons.quantity)
        ) : (
          <span className="mx-1  text-green-700">{t`common:in-stock`}</span>
        )}
      </h1>
      <div className="flex items-center mb-1">
        <div className="flex items-center text-gray-600 text-sm">
          <h1 className="text-gray-600 text-sm">{t`products:model-number`}</h1>
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
            className="mx-2 flex items-center"
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
      <hr className="my-2" />
      <div className="flex items-start py-1">
        <div className=" flex-1 font-bold" style={{ fontWeight: '900' }}>
          {data.simple_addons.promotion_price && (
            <div className=" flex items-center ">
              <h1>{t`products:price-before`} :</h1>
              <h1 className=" mx-2 italic  line-through text-gray-700">
                {data.simple_addons.price}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>{' '}
            </div>
          )}
          <div className="">
            <div className="flex items-center flex-1 flex-wrap">
              <h1 className="text-xl">
                {data.simple_addons.promotion_price
                  ? t`products:price-now`
                  : t`common:price`}
                :
              </h1>
              <h1 className=" text-xl mx-2 text-main-color">
                {data.simple_addons.promotion_price
                  ? (
                      data.simple_addons.promotion_price *
                      deliveryCountry?.currency.value
                    ).toFixed(3)
                  : (
                      data.simple_addons.price * deliveryCountry?.currency.value
                    ).toFixed(3)}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" font-normal uppercase text-sm  text-gray-700">
                ({t`products:vat-inclusive`})
              </h1>
            </div>
            {data.simple_addons.promotion_price && (
              <div className="flex items-center   ">
                <h1>{t`products:you-save`} :</h1>
                <span className="mx-1 font-bold text-main-color">
                  {calculateDiscountPrice(
                    data.simple_addons.price,
                    data.simple_addons.promotion_price
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="my-2" />

      {data?.related_products?.length > 0 && (
        <RelatedItems data={data.related_products} />
      )}
    </div>
  );
}
