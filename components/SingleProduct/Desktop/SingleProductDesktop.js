import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DataProvider } from '../../../contexts/DataContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { getSingleItem, getProductReviews } from '../../../utils/queries';
import { AuthProvider } from '../../../contexts/AuthContext';
import SideCartMenuDesktop from '../../SideCartMenu/Desktop/SideCartMenuDesktop';
import VariantProductDesktop from './VariantSingleProduct/VariantProductDesktop';
import ImageZoom from './ImageZoom';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';

export default function SingleProductDesktop() {
  const {
    query: { id },
    locale,
  } = useRouter();

  const { deliveryCountry, addViewedItems } = React.useContext(DataProvider);
  const { t } = useTranslation();
  const {
    addToCartMutation,
    addToWishListMutation,
    addToGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);

  const { userId } = React.useContext(AuthProvider);

  /**
   * Main Fetch
   */
  const { data } = useQuery(['singleProduct', id], () => getSingleItem(id), {
    refetchOnWindowFocus: false,
    onSuccess: () => {
      // add Item to localStorage
      addViewedItems(id);
    },
    retry: 2,
  });
  const { data: reviews, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    () => getProductReviews(id),
    { retry: true, enabled: Boolean(data), refetchOnWindowFocus: false }
  );

  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [detailsTab, setDetailsTab] = React.useState(0);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);
  React.useEffect(() => {
    return () => setItemInCart(false);
  }, [id]);
  const handleAddToCart = async quantity => {
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

  const handleAddToWishList = async () => {
    setAddToWishListButtonLoading(true);
    try {
      await addToWishListMutation({ id: data.id, userId });
      setAddToWishListButtonLoading(false);
      setItemInWishList(true);
    } catch (error) {
      if (error.response.data.message === 'Item founded on the Wishlist') {
        setItemInWishList(true);
      }
      setAddToWishListButtonLoading(false);
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

      <AnimatePresence>
        {sideMenuOpen && (
          <SideCartMenuDesktop
            key="side-cart"
            setSideMenuOpen={setSideMenuOpen}
          />
        )}
        {sideMenuOpen && (
          <motion.div
            key="sidecart-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSideMenuOpen(false)}
            className="side__addCart-bg"
          />
        )}
      </AnimatePresence>

      <div
        className=" p-4 mx-auto max-w-default"
        style={{ minHeight: 'calc(-150px + 100vh)' }}
      >
        {/* {isLoading && <SingleProductLoader />} */}
        {data?.type === 'variation' &&
        Object.entries(data.new_variation_addons).length > 0 ? (
          <VariantProductDesktop
            data={data}
            reviewsLoading={reviewsLoading}
            reviews={reviews}
            setSideMenuOpen={setSideMenuOpen}
            setDetailsTab={setDetailsTab}
          />
        ) : (
          <div className="single-product__container-desktop">
            <div>
              <ImageZoom data={data} />
            </div>

            <MiddleSection
              data={data}
              reviewsLoading={reviewsLoading}
              ratingCount={reviews?.ratingCount}
              averageRating={reviews?.averageRating}
              setDetailsTab={setDetailsTab}
            />
            <RightSection
              handleAddToCart={handleAddToCart}
              handleAddToWishList={handleAddToWishList}
              addToCartButtonLoading={addToCartButtonLoading}
              addToWishListButtonLoading={addToWishListButtonLoading}
              itemInCart={itemInCart}
              itemInWishList={itemInWishList}
              userId={userId}
              qty={data.simple_addons.quantity}
            />
          </div>
        )}
        <div id="details" className="py-2 mb-2">
          {/* <AdditionalDetails
            reviews={reviews?.reviews}
            averageRating={reviews?.averageRating}
            reviewsLoading={reviewsLoading}
            ratingCount={reviews?.ratingCount}
            detailsTab={detailsTab}
            setDetailsTab={setDetailsTab}
            data={data}
          /> */}
        </div>
        <hr className="my-8" />
        {(data?.categories[0]?.parent_slug || data?.categories[0]?.slug) &&
          // <MoreFrom
          //   categories={data?.categories}
          //   setSideMenuOpen={setSideMenuOpen}
          // />
          'hi'}
      </div>
      <div className="flex items-center justify-center mt-8 mb-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 uppercase bg-main-color rounded text-main-text"
        >
          {t`common:back-to-top`}
        </button>
      </div>
    </>
  );
}
