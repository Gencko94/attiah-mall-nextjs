import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import SwiperCore, { Thumbs, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Thumbs, Navigation]);

export default function ImageZoom({ data }) {
  const { t } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { locale } = useRouter();
  const [doubleClicked, setDoubleClicked] = React.useState(false);

  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <Swiper
          id="main"
          slidesPerView={1}
          onDoubleClick={() => setDoubleClicked(true)}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {[data.image, ...data.gallery].map(item => {
            return (
              <SwiperSlide className="relative" id="slide" key={item?.link}>
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/original/${item?.link}`}
                      alt={data.full_translation[locale].title}
                      layout="fill"
                      id={item?.link}
                    />
                  </TransformComponent>
                </TransformWrapper>

                {!doubleClicked && (
                  <div
                    className="absolute text-center z-20 right-0 left-0 mx-auto bottom-10 p-2 shadow rounded font-semibold"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      width: '80%',
                    }}
                  >
                    {t`products:double-click-zoom`}
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div
        className={`absolute top-0  ${locale === 'ar' ? 'right-0' : 'left-0'}`}
      >
        <Swiper
          id="thumbs"
          onSwiper={setThumbsSwiper}
          direction="vertical"
          slidesPerView="auto"
          freeMode
          spaceBetween={10}
          watchSlidesVisibility
          watchSlidesProgress
        >
          {[data.image, ...data.gallery].map(item => {
            return (
              <SwiperSlide
                key={item?.link}
                style={{ width: '50px', height: '50px' }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/original/${item?.link}`}
                  alt={data.full_translation[locale].title}
                  layout="fill"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
