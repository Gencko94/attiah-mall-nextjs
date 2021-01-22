import { useRouter } from 'next/router';
import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation]);
export default function Options({
  options,
  selectedOption,
  setSelectedOption,
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
        {options[selectedOption[selectedVariation]][`name_${locale}`]}
      </h1>
      {options.length > 6 ? (
        <Swiper navigation id="main" spaceBetween={3} breakpoints={breakpoints}>
          {options.map((option, i) => {
            const selected = selectedOption[selectedVariation] === i;
            return (
              <SwiperSlide
                key={option.addon_item_id}
                className="overflow-hidden   relative my-1 rounded"
              >
                <button
                  onClick={() =>
                    setSelectedOption(prev => {
                      return {
                        ...prev,
                        [selectedVariation]: i,
                      };
                    })
                  }
                  key={option.addon_item_id}
                  className={`
                
                 hover:bg-main-color hover:text-main-text transition duration-150
              
              } p-2 uppercase border text-sm text-center ${
                selected
                  ? 'bg-main-color text-main-text'
                  : 'text-body-text-light'
              } `}
                >
                  {option.addon_item_value}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="single-product-variants__container my-1">
          {options.map((option, i) => {
            const selected = selectedOption[selectedVariation] === i;
            return (
              <button
                onClick={() =>
                  setSelectedOption(prev => {
                    return {
                      ...prev,
                      [selectedVariation]: i,
                    };
                  })
                }
                key={option.addon_item_id}
                className={`
                
                 hover:bg-main-color hover:text-main-text transition duration-150
              
              } p-2 uppercase border text-sm text-center ${
                selected
                  ? 'bg-main-color text-main-text'
                  : 'text-body-text-light'
              } `}
              >
                {option.addon_item_value}
              </button>
            );
          })}
        </div>
      )}
      <hr className="my-2" />
    </div>
  );
}
