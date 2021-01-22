import React from 'react';

import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { getMainCarouselItems } from '../utils/queries';
import isMobile from '../utils/isMobile';
import BannerLazyImage from '../utils/BannerLazyImage';
import 'swiper/swiper-bundle.css';
// import BannerLazyImage from '../../helpers/BannerLazyImage';

SwiperCore.use([Pagination, Autoplay]);
const MainCarousel = () => {
  const isMobileDevice = isMobile();
  const { locale } = useRouter();
  const { data, isLoading } = useQuery(
    ['mainCarousel', isMobile],
    () => getMainCarouselItems(isMobileDevice),
    { refetchOnWindowFocus: false, retry: true }
  );
  return (
    <div className="my-6 bg-body-light">
      <Swiper
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        id="main"
        spaceBetween={0}
      >
        {isLoading &&
          [0, 1, 2].map(i => {
            return (
              <SwiperSlide key={i} className="">
                <ContentLoader
                  speed={4}
                  viewBox={`0 0 ${!isMobileDevice ? '1440' : '800'} 300`}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
                </ContentLoader>
              </SwiperSlide>
            );
          })}
        {!isLoading &&
          data.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <a href={`/${locale}/${item.category?.slug}`} className="">
                  <BannerLazyImage
                    src={item.translation[locale].image?.link}
                    alt="something"
                    origin="original"
                    pb={`${
                      !isMobileDevice
                        ? 'calc(100% * 300/1440)'
                        : 'calc(100% * 300/800)'
                    }`}
                  />
                </a>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
export default MainCarousel;
