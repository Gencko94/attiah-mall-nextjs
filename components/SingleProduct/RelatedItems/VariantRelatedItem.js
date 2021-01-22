import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { BiListPlus } from 'react-icons/bi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DataProvider } from '../../../contexts/DataContext';

export default function VariantRelatedItem({ item }) {
  const { deliveryCountry } = React.useContext(DataProvider);
  const { push, locale } = useRouter();
  const { t } = useTranslation();
  const [selectedVariation, setSelectedVariant] = React.useState(() => {
    return Object.keys(item.new_variation_addons)[0];
  });
  const [selectedOption] = React.useState(() => {
    const keys = {};
    Object.keys(item.new_variation_addons).forEach(variation => {
      keys[variation] = 0;
    });
    return keys;
  });

  const variantOnly = item.new_variation_addons[selectedVariation].options
    ? false
    : true;
  const option = variantOnly
    ? item.new_variation_addons[selectedVariation]
    : item.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ];
  const isSale = item.new_variation_addons[selectedVariation].options
    ? item.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ].promotion_price
      ? true
      : false
    : item.new_variation_addons[selectedVariation].promotion_price
    ? true
    : false;

  const resolveAddons = () => {
    if (!variantOnly) {
      return Object.keys(item.new_variation_addons)
        .slice(0, 3)
        .map(variation => {
          return item.new_variation_addons[variation].options[
            selectedOption[variation]
          ].image ? (
            <img
              role="presentation"
              key={variation}
              onClick={() => setSelectedVariant(variation)}
              className={`cursor-pointer ${
                selectedVariation === variation && 'border'
              }`}
              alt={item.new_variation_addons[variation].id}
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${
                item.new_variation_addons[variation].options[
                  selectedOption[variation]
                ]?.image
              }`}
            />
          ) : (
            <button
              onClick={() => setSelectedVariant(variation)}
              className={`p-1 ${
                selectedVariation === variation
                  ? 'bg-main-color text-main-text'
                  : ''
              } rounded flex items-center justify-center`}
            >
              {item.new_variation_addons[variation].addon_item_value.substr(
                0,
                1
              )}
            </button>
          );
        });
    }
    return Object.keys(item.new_variation_addons)
      .slice(0, 3)
      .map(variation => {
        return item.new_variation_addons[variation].image ? (
          <img
            role="presentation"
            onClick={() => {
              setSelectedVariant(variation);
            }}
            key={variation}
            className={`cursor-pointer ${
              selectedVariation === variation && 'border'
            }`}
            alt={option.id}
            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${item.new_variation_addons[variation].image}`}
          />
        ) : (
          <button
            key={variation}
            onClick={() => setSelectedVariant(variation)}
            className={`p-1 ${
              selectedVariation === variation
                ? 'bg-main-color text-main-text'
                : ''
            } rounded flex items-center justify-center`}
          >
            {item.new_variation_addons[variation].addon_item_value.substr(0, 1)}
          </button>
        );
      });
  };
  const resolveImage = () => {
    if (item.new_variation_addons[selectedVariation].options) {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${
            item.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || item.image?.link
          }`}
          alt={item.translation[locale].title}
          layout="fill"
        />
      );
    }
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${
          item.new_variation_addons[selectedVariation].image || item.image?.link
        }`}
        alt={item.translation[locale].title}
        layout="fill"
      />
    );
  };

  const resolveName = () => {
    const variationName =
      item.new_variation_addons[selectedVariation].addon_item_value;
    return `${item.translation[locale].title} ${variationName}`;
  };
  return (
    <div>
      <div className="relative">
        <Link href={`/products/${item.slug}/${item.id}`}>
          <a
            className="block relative"
            style={{ paddingBottom: 'calc(100% * 266/210)' }}
          >
            {resolveImage()}
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
            <h1 className="font-semibold text-xs text-clamp-2">
              {resolveName()}
            </h1>
          </Link>
        </div>

        <div className="p-2 flex items-center justify-between">
          {isSale ? (
            <div className=" flex items-center">
              <h1 className="font-semibold text-lg text-main-color">
                {(
                  option.promotion_price * deliveryCountry?.currency.value
                ).toFixed(3)}
                <span className="mx-1 text-sm">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" text-sm mx-1 italic  line-through text-gray-700">
                {(option.price * deliveryCountry?.currency.value).toFixed(3)}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="font-semibold text-lg text-main-color">
              {(option.price * deliveryCountry?.currency.value).toFixed(3)}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
        <div
          className="p-1"
          style={{
            display: 'grid',
            gap: '0.2rem',
            gridTemplateColumns: 'repeat(auto-fill,32px)',
          }}
        >
          {resolveAddons()}
          {Object.keys(item.new_variation_addons).length > 3 && (
            <button
              onClick={() => push(`/products/${item.slug}/${item.id}`)}
              title={t`common:show-more`}
              className={`p-1  border
               rounded flex items-center justify-center`}
            >
              <BiListPlus className="text-main-color w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
