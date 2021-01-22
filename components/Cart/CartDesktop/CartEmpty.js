import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { AuthProvider } from '../../../contexts/AuthContext';

export default function CartEmpty() {
  const { userId } = React.useContext(AuthProvider);
  const { t } = useTranslation();
  const variants = {
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
      className=" flex flex-col items-center justify-center h-full"
    >
      <div className="flex items-center justify-center flex-col">
        <div>
          <img
            src="/illustrationplaceholder.png"
            alt="No Cart Items"
            className=""
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold p-2">{t`cart:cart-empty`}</h1>
          <Link href="/">
            <a className="text-blue-600 hover:underline">
              {t`cart:check-today-deals`}
            </a>
          </Link>
        </div>
      </div>
      {!userId && (
        <div className="flex flex-col justify-center p-2 font-semibold">
          <Link
            href="/app/login"
            className={`text-center rounded py-2 px-3 bg-green-700 text-main-text uppercase `}
          >
            <a>{t`common:login`}</a>
          </Link>
          <Link href="/register">
            <a
              className={` text-center  rounded py-2 px-3 bg-blue-700 text-main-text mt-2 uppercase `}
            >
              {t`common:register`}
            </a>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
