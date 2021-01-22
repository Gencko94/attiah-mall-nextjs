import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function CategoryButton({ item, handleDropDownOpen }) {
  const { locale } = useRouter();
  return (
    <Link
      href={{ pathname: `/${item.category.slug}`, state: { page: 1 } }}
      id={`navButton${item.id}`}
      onMouseEnter={() => {
        handleDropDownOpen(item.id);
      }}
    >
      <a className="p-2 font-semibold cursor-pointer  hover:bg-body-light">
        {item.category.translation[locale].name}
      </a>
    </Link>
  );
}
