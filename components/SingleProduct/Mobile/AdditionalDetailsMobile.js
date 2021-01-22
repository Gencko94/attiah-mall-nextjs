import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import ItemDescription from '../ItemDescription';
import ItemReviews from '../ItemReviews';

export default function AdditionalDetailsMobile({
  detailsTab,
  setDetailsTab,
  reviewsLoading,
  reviews,
  ratingCount,
  averageRating,
  data,
}) {
  const { t } = useTranslation();
  return (
    <div className="py-2">
      <div className="flex justify-center mb-2">
        <button
          onClick={() => setDetailsTab(0)}
          className={`text-lg py-2 flex-1 text-center   ${
            detailsTab === 0 && 'bg-main-color  text-main-text'
          }   bg-gray-400`}
        >
          {t`product:item-details`}
        </button>

        <button
          id="details"
          onClick={() => setDetailsTab(1)}
          className={`text-lg py-2 flex-1 text-center   ${
            detailsTab === 1 && 'bg-main-color  text-main-text'
          }   bg-gray-400`}
        >
          {t`product:item-reviews`}
        </button>
      </div>
      <div className="px-3 text-sm">
        {detailsTab === 0 && <ItemDescription data={data} />}
        {detailsTab === 1 && (
          <ItemReviews
            reviews={reviews}
            reviewsLoading={reviewsLoading}
            ratingCount={ratingCount}
            averageRating={averageRating}
          />
        )}
      </div>
    </div>
  );
}
