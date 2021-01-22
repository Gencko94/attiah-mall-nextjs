import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import SwiperCore, { Thumbs, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Thumbs, Navigation]);
export default function VariantImageZoomMobile({
  data,
  selectedVariation,
  selectedOption,
}) {
  const [doubleClicked, setDoubleClicked] = React.useState(false);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const { locale } = useRouter();
  const { t } = useTranslation();
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
    <div className="mb-2">
      <Swiper
        onDoubleClick={() => setDoubleClicked(true)}
        id="main"
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
      >
        <SwiperSlide>
          <TransformWrapper>
            <TransformComponent>{resolveImage()}</TransformComponent>
          </TransformWrapper>
        </SwiperSlide>
        {!doubleClicked && (
          <div
            className="absolute bottom-10 p-2 shadow rounded font-semibold"
            style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
          >
            {t`products:double-click-zoom`}
          </div>
        )}
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
        <SwiperSlide>{resolveThumbnail()}</SwiperSlide>
      </Swiper>
    </div>
  );
}
