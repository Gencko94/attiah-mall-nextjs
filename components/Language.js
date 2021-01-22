import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Language() {
  const { locale } = useRouter();
  const getCurrentPath = () => {
    return '/';
  };
  return (
    <div className="p-1">
      {locale === 'en' && (
        <Link href={getCurrentPath()} locale="ar">
          <a className="  font-semibold    font-cairo transition duration-100 hover:text-main-color">
            العربية
          </a>
        </Link>
      )}
      {locale === 'ar' && (
        <Link href={getCurrentPath()} locale="en">
          <a className="   font-semibold   font-cairo transition duration-100 hover:text-main-color">
            English
          </a>
        </Link>
      )}
    </div>
  );
}
