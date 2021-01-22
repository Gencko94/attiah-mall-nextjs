import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import { useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
// import SwiperLoader from '../Home/SwiperLoader';
import SwiperItem from './SwiperItems/SwiperItem';
import VariantSwiperItem from './SwiperItems/VariantSwiperItem';
import { getStaticSwiperData } from '../utils/queries';
import SwiperLoader from '../Loaders/SwiperLoader';

// import { Link } from 'react-router-dom';
// import ErrorSnackbar from '../ErrorSnackbar';
SwiperCore.use([Navigation]);
export default function StaticSwiper({ type, cb, title }) {
  const [triggerRef, inView] = useInView({ triggerOnce: true });
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { data, isLoading, isIdle } = useQuery(
    ['staticSwiper', type],
    () => getStaticSwiperData(type),
    { retry: true, refetchOnWindowFocus: false, enabled: inView }
  );

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
    768: {
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
    <div ref={triggerRef} className="static-swiper">
      {/* {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )} */}

      {isIdle && <div className="mb-4 " style={{ height: '30px' }} />}
      {isLoading && <SwiperLoader />}
      {!isLoading && !isIdle && (
        <div className="flex items-center mb-4">
          <h1 className="text-xl md:text-2xl flex-1 font-bold ">
            {data?.title[locale]?.name}
          </h1>
          {type !== 'latest_products' && type !== 'best_seller' && (
            <Link href={`/${data?.slug}`}>
              <a className="py-1 px-2 font-bold  bg-main-color text-second-nav-text-light rounded whitespace-no-wrap">
                {t`common:see-all`}
              </a>
            </Link>
          )}
        </div>
      )}
      {!isLoading && !isIdle && (
        <Swiper
          navigation
          id="main"
          spaceBetween={10}
          breakpoints={breakpoints}
        >
          {data.products.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                className="overflow-hidden relative my-2 rounded"
              >
                {item.type === 'variation' &&
                Object.keys(item.new_variation_addons).length > 0 ? (
                  <VariantSwiperItem
                    item={item}
                    setCartMenuOpen={cb}
                    setErrorMessage={setErrorMessage}
                    setErrorOpen={setErrorOpen}
                  />
                ) : (
                  <SwiperItem
                    item={item}
                    setCartMenuOpen={cb}
                    setErrorMessage={setErrorMessage}
                    setErrorOpen={setErrorOpen}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
