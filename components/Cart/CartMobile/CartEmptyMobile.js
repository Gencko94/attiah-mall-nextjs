import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { AuthProvider } from '../../../contexts/AuthContext';

export default function CartEmptyMobile() {
  const { userId } = React.useContext(AuthProvider);
  const { t } = useTranslation();
  const { variants } = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
    >
      <div className="p-2">
        <div
          className="flex items-center justify-center"
          style={{ minHeight: '23em' }}
        >
          <img
            src="/illustrationplaceholder.png"
            alt="No Cart Items"
            className=""
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold  ">{t`cart:cart-empty`}</h1>
          <Link href="/">
            <a className="text-blue-600">{t`cart:check-today-deals`}</a>
          </Link>
        </div>
      </div>
      {!userId && (
        <div className="flex flex-col justify-center p-2">
          <Link
            href="/app/login"
            className="text-center rounded p-2 uppercase bg-green-700 text-main-text"
          >
            <a>{t`common:login`}</a>
          </Link>
          <Link
            href="/register"
            className="text-center text-main-text mt-2 rounded p-2 uppercase bg-blue-700"
          >
            {t`common:register`}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
