import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import moment from 'moment';
import 'moment/locale/ar';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

export default function ItemReviews({
  reviews,
  reviewsLoading,
  averageRating,
  ratingCount,
}) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  moment.locale(locale);
  const resolvePlural = () => {
    switch (ratingCount) {
      case 1:
        return t`products:one-rating`;

      case 2:
        return t`products:two-ratings`;

      case ratingCount > 10 && ratingCount:
        return t`products:more-than-10-ratings`;

      default:
        return t`products:ratings`;
    }
  };
  if (reviewsLoading) {
    return (
      <div
        className="w-full flex flex-col items-center justify-center "
        style={{ height: '160px' }}
      >
        <h1 className="font-semibold mb-4 text-lg">
          {t`products:loading-reviews`}
        </h1>
        <Loader
          type="TailSpin"
          color="#b72b2b"
          height={50}
          width={50}
          visible
        />
      </div>
    );
  }

  if (!reviewsLoading && reviews.length === 0) {
    return (
      <div className="flex p-6 items-center  text-center justify-center text-base flex-col">
        <h1 className="text-xl font-semibold mb-2 ">
          {t`products:no-ratings`}
        </h1>
        <h1 className="mb-2 text-gray-700">{t`products:how-to-rate`}</h1>
        <h1 className="mb-2">{t`products:rating-guide`}</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center flex-wrap mb-2">
        <h1 className="font-semibold text-xl">{t`products:average-rating`}</h1>
        <div className="mx-2">
          <Rating
            initialRating={averageRating}
            readonly
            emptySymbol={<AiOutlineStar className="text-main-color h-6 w-6" />}
            fullSymbol={<AiFillStar className="text-main-color h-6 w-6" />}
            className=" pt-1"
          />
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <h1>{ratingCount > 2 && ratingCount}</h1>
          <h1 className="mx-1">{resolvePlural()}</h1>
        </div>
      </div>
      {reviews.length !== 0 && (
        <>
          <h1 className="font-semibold mb-1">
            {t`products:customers-feedback`} ({reviews.length})
          </h1>
          <div className="grid grid-cols-1 gap-2 p-3 bg-gray-100 rounded">
            {reviews.map((review, i) => {
              return (
                <div key={review.id}>
                  <div>
                    <h1 className="font-semibold">{review.customer.name}</h1>
                  </div>
                  <div className="flex items-center">
                    <Rating
                      initialRating={review.rating}
                      readonly
                      emptySymbol={
                        <AiOutlineStar className="text-main-color" />
                      }
                      fullSymbol={<AiFillStar className="text-main-color" />}
                      className=" pt-1"
                    />

                    <h1 className="text-gray-600 text-sm mx-1">
                      {moment(review.created_at).fromNow()}
                    </h1>
                  </div>
                  <div className="mb-2">
                    <p className="">{review.review}</p>
                  </div>
                  {i !== reviews.length - 1 && <hr className="mt-2" />}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
