import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { DataProvider } from '../../../contexts/DataContext';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function RelatedItem({ item }) {
  const { locale } = useRouter();
  const { deliveryCountry } = React.useContext(DataProvider);

  return (
    <div>
      <div className="relative">
        <Link href={`/products/${item.slug}/${item.id}`}>
          <a
            className="block relative"
            style={{ paddingBottom: 'calc(100% * 266/210)' }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${item.image?.link}`}
              alt={item.translation[locale].title}
              layout="fill"
            />
          </a>
        </Link>
      </div>

      <div className="bg-body-light text-body-text-light">
        <div className="p-2" style={{ height: '55px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            href={`/products/${item.slug}/${item.id}`}
          >
            <a className="text-clamp-2 text-xs font-semibold">
              {item.translation[locale].title}
            </a>
          </Link>
        </div>

        <div className="p-2 flex items-center justify-between">
          {item.simple_addons?.promotion_price ? (
            <div className="flex items-center">
              <h1 className="font-semibold text-lg text-main-color">
                {(
                  item.simple_addons.promotion_price *
                  deliveryCountry?.currency.value
                ).toFixed(3)}
              </h1>
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
              <h1 className=" text-sm mx-1 italic  line-through text-gray-700">
                {(
                  item.simple_addons.price * deliveryCountry?.currency.value
                ).toFixed(3)}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="font-semibold text-main-color">
              {(
                item.simple_addons.price * deliveryCountry?.currency.value
              ).toFixed(3)}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
