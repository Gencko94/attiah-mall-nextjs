import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useRouter } from 'next/router';

SwiperCore.use([Navigation]);
export default function VariantsOnly({
  variants,
  setSelectedVariant,
  selectedVariation,
}) {
  const breakpoints = {
    // when window width is >= 640px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };
  const { locale } = useRouter();
  return (
    <div>
      <h1 className="font-semibold mb-2">
        {variants[selectedVariation][`name_${locale}`]}
      </h1>

      {Object.keys(variants).length > 6 ? (
        <Swiper navigation id="main" spaceBetween={3} breakpoints={breakpoints}>
          {Object.keys(variants).map(variation => {
            return (
              <SwiperSlide
                key={variants[variation].addon_item_id}
                className="overflow-hidden   relative my-1 rounded"
              >
                {variants[variation].image ? (
                  <button
                    className={`${
                      selectedVariation === variation &&
                      'border shadow border-main-color'
                    }`}
                    onClick={() => setSelectedVariant(variation)}
                  >
                    <img
                      alt={variants[variation].id}
                      src={`${process.env.REACT_APP_IMAGES_URL}/small/${variants[variation].image}`}
                    />
                    <h1 className="mt-1 text-sm font-semibold">
                      {variants[variation].addon_item_value}
                    </h1>
                  </button>
                ) : (
                  <button
                    className={`${
                      selectedVariation === variation &&
                      'bg-main-color text-main-text'
                    } p-2 uppercase border flex items-center justify-center`}
                    onClick={() => setSelectedVariant(variation)}
                  >
                    {variants[variation].addon_item_value}
                  </button>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="single-product-variants__container">
          {Object.keys(variants).map(variation =>
            variants[variation].image ? (
              <button
                key={variation}
                className={`${
                  selectedVariation === variation &&
                  'border shadow border-main-color'
                }`}
                onClick={() => setSelectedVariant(variation)}
              >
                <img
                  alt={variants[variation].id}
                  src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${variants[variation].image}`}
                />
                <h1 className="mt-1 text-sm font-semibold">
                  {variants[variation].addon_item_value}
                </h1>
              </button>
            ) : (
              <button
                className={`${
                  selectedVariation === variation &&
                  'bg-main-color text-main-text'
                } p-2 uppercase border flex items-center justify-center`}
                onClick={() => setSelectedVariant(variation)}
              >
                {variants[variation].addon_item_value}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
