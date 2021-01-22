import { useRouter } from 'next/router';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SwiperLoader() {
  const { locale } = useRouter();
  const breakpoints = {
    // when window width is >= 320px
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
      slidesPerView: 4,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 20,
    },
  };
  return (
    <Swiper id="main" spaceBetween={10} breakpoints={breakpoints}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <SwiperSlide key={i} className=" my-1">
          <ContentLoader
            speed={2}
            viewBox="0 0 165 321"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            rtl={locale === 'ar'}
          >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="321" />
          </ContentLoader>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
