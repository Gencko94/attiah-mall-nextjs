import React from 'react';

import SwiperCore, { Thumbs, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'swiper/swiper-bundle.css';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

SwiperCore.use([Thumbs, Navigation]);
export default function ImageZoomMobile({ data }) {
  const { locale } = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { t } = useTranslation();
  const [doubleClicked, setDoubleClicked] = React.useState(false);

  return (
    <div className="mb-2">
      <Swiper
        id="main"
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        onDoubleClick={() => setDoubleClicked(true)}
        className="mb-4"
      >
        {[data.image, ...data.gallery].map(item => {
          return (
            <SwiperSlide className="relative" key={item?.link}>
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/original/${item?.link}`}
                    alt={data.full_translation[locale].title}
                    style={{ maxHeight: '400px', width: 'auto' }}
                  />
                </TransformComponent>
              </TransformWrapper>
              {!doubleClicked && (
                <div
                  className="absolute bottom-10 p-2 shadow rounded font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                >
                  {t`products:double-click-zoom`}
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        id="thumbs"
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        freeMode
        spaceBetween={10}
        watchSlidesVisibility
        watchSlidesProgress
      >
        {[data.image, ...data.gallery].map(item => {
          return (
            <SwiperSlide className="px-2" key={item.link}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${item.link}`}
                alt={data.full_translation[locale].title}
                style={{ width: '50px', height: '50px' }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
