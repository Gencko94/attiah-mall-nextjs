import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import SwiperCore, { Thumbs, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Thumbs, Navigation]);
export default function VariantImageZoom({
  data,
  selectedVariation,
  selectedOption,
}) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [doubleClicked, setDoubleClicked] = React.useState(false);

  const resolveImage = () => {
    if (data.new_variation_addons[selectedVariation].options) {
      return (
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/original/${
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image?.link
          }`}
          alt={data.full_translation[locale].title}
          layout="fill"
        />
      );
    }
    return (
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/original/${
          data.new_variation_addons[selectedVariation].image || data.image?.link
        }`}
        alt={data.full_translation[locale].title}
        layout="fill"
      />
    );
  };
  const resolveThumbnail = () => {
    if (data.new_variation_addons[selectedVariation].options) {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${
            data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || data.image?.link
          }`}
          alt={data.full_translation[locale].title}
          layout="fill"
        />
      );
    }
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${
          data.new_variation_addons[selectedVariation].image || data.image?.link
        }`}
        alt={data.full_translation[locale].title}
        layout="fill"
      />
    );
  };
  return (
    <div className="sticky" style={{ alignSelf: 'self-start', top: '130px' }}>
      <div className={`${locale === 'ar' ? 'mr-16' : 'ml-16'}`}>
        <Swiper
          id="main"
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper }}
          onDoubleClick={() => setDoubleClicked(true)}
        >
          <SwiperSlide className="relative">
            {' '}
            <TransformWrapper>
              <TransformComponent>
                <div style={{ maxHeight: '400px', width: 'auto' }}>
                  {resolveImage()}
                </div>
              </TransformComponent>
            </TransformWrapper>
            {!doubleClicked && (
              <div
                className="absolute text-center left-0 right-0 mx-auto bottom-10 p-2 shadow rounded font-semibold"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  width: '80%',
                }}
              >
                {t`products:double-click-zoom`}
              </div>
            )}
          </SwiperSlide>
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
          <div style={{ width: '50px', height: '50px' }}>
            {resolveThumbnail()}
          </div>
        </Swiper>
      </div>
    </div>
  );
}
