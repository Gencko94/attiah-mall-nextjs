import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CartAndWishlistProvider } from '../../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../../contexts/DataContext';
import MobileCheckoutSectionLoader from '../../../../Loaders/MobileCheckoutSectionLoader';
import AcceptedPaymentsMobile from '../AcceptedPaymentsMobile';

export default function MobileGuestCheckoutSection({ setCheckOutPopupOpen }) {
  const {
    guestCartItems,
    guestCartItemsLoading,
    guestCartTotal,
    guestCouponCost,
    guestCartSubtotal,
    checkCouponMutation,
    isCheckingCoupon,
    setCoupon,
    guestShippingCost,
    guestCartItemsFetching,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [couponCode, setCouponCode] = React.useState('');
  const [validCoupon, setValidCoupon] = React.useState(false);
  const [couponError, setCouponError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { t } = useTranslation();
  const { locale } = useRouter();
  const resolvePlural = () => {
    switch (guestCartItems.length) {
      case 1:
        return t`common:one-item`;

      case 2:
        return t`common:two-items`;

      case guestCartItems.length > 10 && guestCartItems.length:
        return t`common:more-than-10-items`;
      default:
        return t`common:multiple-items`;
    }
  };
  const handleCheckout = () => {
    setCheckOutPopupOpen(true);
  };
  const handleSubmitCoupon = async e => {
    e.preventDefault();
    if (validCoupon) {
      setValidCoupon(false);
      setCoupon(null);
      setCouponCode('');
    } else {
      setCouponError(false);

      if (!couponCode) {
        return;
      }
      try {
        await checkCouponMutation({
          code: couponCode,
          subtotal: guestCartSubtotal.toString(),
        });
        setValidCoupon(true);
        setCoupon(couponCode);
      } catch (error) {
        setValidCoupon(false);

        setCouponError(true);
        if (error.response.data.message === 'Coupon expired') {
          setErrorMessage(t`cart:coupon-expired`);
        } else if (
          error.response.data.message?.code?.[0] ===
          'The selected code is invalid.'
        ) {
          setErrorMessage(t`cart:coupon-invalid`);
        } else if (error.response.data.message === 'Coupon not exist') {
          setErrorMessage(t`cart:coupon-invalid`);
        } else if (
          error.response.data.message === 'The amount is less then the minimum'
        ) {
          setErrorMessage(t`cart:coupon-conditions-not-met`);
        }
      }
    }
  };

  if (guestCartItemsLoading) {
    return (
      <div className="-mx-2 -mt-1">
        <MobileCheckoutSectionLoader locale={locale} />
      </div>
    );
  }
  if (!guestCartItemsLoading && guestCartItems.length === 0) return null;
  return (
    <>
      <div className="bg-gray-200 font-semibold p-2 -mx-2">
        <form
          onSubmit={handleSubmitCoupon}
          className={`rounded border w-full flex mb-1  overflow-hidden ${
            couponError && 'border-main-color'
          }`}
        >
          <input
            type="text"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            placeholder={t`cart:cart-enter-code-or-coupon`}
            readOnly={validCoupon}
            className={`${
              validCoupon && 'bg-gray-400 text-gray-200'
            } flex-1 placeholder-gray-700  p-2`}
          />
          <button
            type="submit"
            className="bg-main-color flex items-center text-sm justify-center p-2 text-main-text uppercase "
            style={{ width: '70px' }}
          >
            {isCheckingCoupon ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={22}
                width={22}
                visible
              />
            ) : validCoupon ? (
              t`common:remove`
            ) : (
              t`common:enter`
            )}
          </button>
        </form>
        {couponError && (
          <h1 className="text-main-color text-xs">{errorMessage}</h1>
        )}
      </div>
      <div
        className="p-2 font-semibold bg-gray-200 -mx-2 border-b"
        style={{ position: 'sticky', top: 0, zIndex: 2 }}
      >
        <div className=" flex mb-2  ">
          <h1 className="text-gray-900">{t`common:cart-total`}</h1>
          <h1 className="mx-1 whitespace-no-wrap flex-1">
            (
            {locale === 'ar'
              ? guestCartItems.length > 2 && guestCartItems.length
              : `${guestCartItems.length} `}
            {resolvePlural()})
          </h1>
          <h1>{guestCartSubtotal}</h1>
          <span className="mx-1">
            {deliveryCountry?.currency.translation[locale].symbol}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <h1 className="flex-1">{t`common:delivery-cost`}</h1>
          <h1>
            {guestShippingCost}
            <span className="mx-1">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </h1>
        </div>
        {validCoupon && (
          <div className="flex text-green-700 items-center mb-2">
            <h1 className=" flex-1">{t`common:coupon-sale`}</h1>
            {guestCartItemsFetching ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={22}
                width={22}
                visible
              />
            ) : (
              <h1>
                {guestCouponCost}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            )}
          </div>
        )}

        <hr className="mb-3" />
        <div className="  flex mb-2 text-lg " style={{ fontWeight: 900 }}>
          <h1 className="flex-1 text-gray-900">{t`common:subtotal`}</h1>
          {guestCartItemsFetching ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={22}
              width={22}
              visible
            />
          ) : (
            <h1 className="text-green-700">
              {guestCartTotal}{' '}
              <span className="mx-1 text-green-700">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
        <hr className="mb-3" />
        <button
          onClick={handleCheckout}
          className={`${
            guestCartItems.length === 0
              ? 'cursor-not-allowed  bg-gray-600'
              : 'bg-green-600'
          } p-2 rounded text-body-light uppercase w-full flex items-center justify-center `}
          disabled={guestCartItems.length === 0}
        >
          {t`cart:checkout`}
        </button>
      </div>
      <AcceptedPaymentsMobile deliveryCountry={deliveryCountry} />
    </>
  );
}
