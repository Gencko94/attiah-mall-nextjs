import React from 'react';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { DataProvider } from '../../../contexts/DataContext';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { getProductReviews, getSingleItem } from '../../../utils/queries';
import SideCartMenuMobile from '../../SideCartMenu/Mobile/SideCartMenuMobile';
import SingleProductMobileLoader from '../../../Loaders/SingleProductMobileLoader';
import VariantProductMobile from './VariantProductMobile.js/VariantProductMobile';
import ImageZoomMobile from './ImageZoomMobile';
import ItemDescription from './ItemDescription';
import FloatingAddToCart from './FloatingAddToCart';
import AdditionalDetailsMobile from './AdditionalDetailsMobile';
import MoreFrom from '../MoreFrom';

export default function SingleProductMobile() {
  const {
    query: { id },
    locale,
  } = useRouter();

  const { addViewedItems, deliveryCountry } = React.useContext(DataProvider);
  const { t } = useTranslation();
  const { userId } = React.useContext(AuthProvider);
  const {
    addToCartMutation,
    addToGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const [itemInCart, setItemInCart] = React.useState(false);

  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [quantity, setQuantity] = React.useState(1);

  const [detailsTab, setDetailsTab] = React.useState(0);

  const [triggerRef, inView] = useInView();

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProduct', id],
    () => getSingleItem(id),
    {
      refetchOnWindowFocus: false,
      retry: true,
      onSuccess: () => {
        // add Item to localStorage
        addViewedItems(id);
      },
    }
  );
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    () => getProductReviews(id),
    { retry: true, enabled: Boolean(data), refetchOnWindowFocus: false }
  );
  React.useEffect(() => {
    return () => setItemInCart(false);
  }, [id]);
  const handleAddToCart = async () => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: data.id, quantity };
        await addToCartMutation({ newItem, userId, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        if (error.response.data.message === 'Item founded on the Cart') {
          setItemInCart(true);
        }
        setAddToCartButtonLoading(false);
      }
    } else {
      try {
        const price = data.simple_addons.promotion_price
          ? data.simple_addons.promotion_price
          : data.simple_addons.price;
        const { sku } = data.simple_addons;
        const newItem = { id: data.id, quantity, price, sku };
        await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        setAddToCartButtonLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>
          {data
            ? ` ${t`common:shop`} ${
                data?.full_translation?.[locale].title
              } ${t`common:on-mrg-mall-kuwait`}`
            : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'}
        </title>
        <meta
          name="description"
          content={
            data
              ? `${t`common:shop`} ${
                  data?.full_translation?.[locale].title
                }  ${t`common:on-mrg-mall-kuwait`}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
        <meta
          property="og:title"
          content={
            data
              ? `${t`common:shop`} ${
                  data?.full_translation?.[locale].title
                }  ${t`common:on-mrg-mall-kuwait`}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
        <meta
          property="og:description"
          content={
            data
              ? `${t`common:shop`} ${
                  data?.full_translation?.[locale].title
                }  ${t`common:on-mrg-mall-kuwait`}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
      </Head>
      <div className="overflow-hidden">
        <AnimatePresence>
          {sideMenuOpen && (
            <SideCartMenuMobile key={998} setSideMenuOpen={setSideMenuOpen} />
          )}
          {sideMenuOpen && (
            <motion.div
              key={369}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSideMenuOpen(false)}
              className="side__addCart-bg"
            />
          )}
        </AnimatePresence>

        {isLoading && <SingleProductMobileLoader />}
        {!isLoading &&
          (data.type === 'variation' &&
          Object.entries(data.new_variation_addons).length > 0 ? (
            <VariantProductMobile
              data={data}
              quantity={quantity}
              setQuantity={setQuantity}
              reviews={reviewsData}
              reviewsLoading={reviewsLoading}
              setSideMenuOpen={setSideMenuOpen}
              setDetailsTab={setDetailsTab}
              inView={inView}
            />
          ) : (
            <div className="">
              <ImageZoomMobile data={data} />

              <hr />
              <div className="flex flex-col w-full  px-3 py-2 bg-white">
                <ItemDescription
                  handleAddToCart={handleAddToCart}
                  data={data}
                  itemInCart={itemInCart}
                  addToCartButtonLoading={addToCartButtonLoading}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  reviewsLoading={reviewsLoading}
                  ratingCount={reviewsData?.ratingCount}
                  averageRating={reviewsData?.averageRating}
                  setDetailsTab={setDetailsTab}
                  userId={userId}
                />

                <hr />
              </div>
            </div>
          ))}
        {!isLoading && (
          <AdditionalDetailsMobile
            data={data}
            detailsTab={detailsTab}
            setDetailsTab={setDetailsTab}
            reviews={reviewsData?.reviews}
            reviewsLoading={reviewsLoading}
            ratingCount={reviewsData?.ratingCount}
            averageRating={reviewsData?.averageRating}
          />
        )}
        <br ref={triggerRef} />
        <AnimatePresence>
          {inView && !itemInCart && !isLoading && data.type === 'simple' && (
            <FloatingAddToCart
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              id={data.id}
              addToCartButtonLoading={addToCartButtonLoading}
              itemInCart={itemInCart}
              price={data.simple_addons.price}
              qty={data.simple_addons.quantity}
            />
          )}
        </AnimatePresence>

        <hr />
        {!isLoading && (
          <div className="px-3">
            <MoreFrom
              categories={data?.categories}
              setSideMenuOpen={setSideMenuOpen}
            />
          </div>
        )}
      </div>
    </>
  );
}
