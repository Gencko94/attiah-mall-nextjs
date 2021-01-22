import Link from 'next/link';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

export default function LoginRegister() {
  const { t } = useTranslation();
  return (
    <div className="flex ml-auto text-first-nav-text-light  ">
      <Link href="/login">
        <button className="p-1 font-semibold rounded mr-1 hover:bg-main-color  transition duration-150">
          {t`common:login`}
        </button>
      </Link>
      <Link href="/register">
        <a
          className=" p-1 font-semibold   rounded 
            hover:bg-main-color 
         transition duration-150"
        >
          {t`common:register`}
        </a>
      </Link>
      <Link href="/track-order">
        <button
          className="p-1 font-semibold   rounded 
          hover:bg-main-color 
           transition duration-150"
        >
          {t`common:track-order`}
        </button>
      </Link>
    </div>
  );
}
