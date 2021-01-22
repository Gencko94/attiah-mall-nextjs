import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { DataProvider } from '../../../contexts/DataContext';

export default function AcceptedPaymentsMobile() {
  const { deliveryCountry } = React.useContext(DataProvider);
  const { t } = useTranslation();
  const resolveFlags = () => {
    const arr = [];
    if (!deliveryCountry) return;
    deliveryCountry.payment.forEach(payment => {
      if (payment.status === 0) return null;
      if (payment.key === 'knet') {
        arr.push(<img key={payment.key} src="/knet.png" alt={payment.key} />);
      }
      if (payment.key === 'credit') {
        arr.push(
          <img key={payment.key} src="/mastercard.png" alt={payment.key} />
        );
      }

      if (payment.key === 'amex') {
        arr.push(<img key={payment.key} src="/amex.png" alt={payment.key} />);
      }
    });
    return arr;
  };
  return (
    <div className="bg-gray-200 -mx-2 p-2 border-b">
      <h1 className="mb-2 text-center font-semibold">
        {t`cart:accepted-payments`}
      </h1>
      <div className="flex items-center justify-evenly mb-2">
        {resolveFlags()}
      </div>
    </div>
  );
}
