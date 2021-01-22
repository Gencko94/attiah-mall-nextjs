import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';

export default function ItemDescription({ data }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <div className="overflow-hidden">
      {data.full_translation[locale].description && (
        <div className="my-1">
          <h1 className="text-center text-xl font-semibold my-1 mb-1 p-1 border-b">
            {t`products:item-description`}
          </h1>
          <div
            className={`inner_html ${locale}`}
            dangerouslySetInnerHTML={{
              __html: data.full_translation[locale].description,
            }}
          />
        </div>
      )}
      {data.full_translation[locale].features && (
        <div className="my-1">
          <h1 className="text-center text-xl font-semibold my-1 mb-1 p-1 border-b">
            {t`products:item-features`}
          </h1>
          <div
            className={`inner_html ${locale}`}
            dangerouslySetInnerHTML={{
              __html: data.full_translation[locale].features,
            }}
          />
        </div>
      )}
      {data.full_translation[locale].materials && (
        <div className="my-1">
          <h1 className="text-center text-xl font-semibold my-1 mb-1 p-1 border-b">
            {t`products:item-materials`}
          </h1>
          <div
            className={`inner_html ${locale}`}
            dangerouslySetInnerHTML={{
              __html: data.full_translation[locale].materials,
            }}
          />
        </div>
      )}

      {!data.full_translation[locale].materials &&
        !data.full_translation[locale].description &&
        !data.full_translation[locale].features && (
          <div className="flex p-6 items-center text-center justify-center text-base flex-col">
            <h1 className="text-xl mb-2 ">
              {t`products:no-item-details-available`}
            </h1>
          </div>
        )}
    </div>
  );
}
