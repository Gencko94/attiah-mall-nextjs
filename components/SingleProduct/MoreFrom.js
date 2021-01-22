import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useQuery } from 'react-query';
import isMobile from '../../utils/isMobile';
import { getCategoryProducts } from '../../utils/queries';
import CategoryProductItem from '../CategoryProductItem';
import VariantCategoryProductItem from '../VariantCategoryProductItem';

export default function MoreFrom({ categories, setSideMenuOpen }) {
  const { t } = useTranslation();
  const category = React.useMemo(() => {
    return categories[0]?.parent_slug || categories[0]?.slug;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const IsMobileDevice = isMobile();
  const { data } = useQuery(
    [
      'category-products',
      {
        category,
        page: 1,
        resultsPerPage: { value: 42 },
      },
    ],
    () =>
      getCategoryProducts({
        category,
        page: 1,
        resultsPerPage: { value: 42 },
      }),
    { retry: true, refetchOnWindowFocus: false, keepPreviousData: true }
  );

  return (
    <div className="my-4">
      <h1 className="text-2xl font-semibold mb-4">{t`products:more-from`}</h1>

      <div
        className={`${
          IsMobileDevice ? 'more-from-grid__mobile' : 'more-from-grid__desktop'
        }`}
      >
        {data?.products.map(item => {
          return item.type === 'variation' &&
            Object.entries(item.new_variation_addons).length > 0 ? (
            <VariantCategoryProductItem
              key={item.id}
              setCartMenuOpen={setSideMenuOpen}
              item={item}
            />
          ) : (
            <CategoryProductItem
              key={item.id}
              setCartMenuOpen={setSideMenuOpen}
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
}
