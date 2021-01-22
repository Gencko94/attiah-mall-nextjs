import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function AllCategoriesButton({
  item,
  handleMenuClose,
  handleMegaMenuOpen,
  selectedCategory,
  isHovering,
}) {
  const { locale } = useRouter();
  React.useEffect(() => {
    if (isHovering) {
      handleMegaMenuOpen(item.id);
    } else {
      // setDropDownOpen(false);
      // setCatData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);
  return (
    <Link
      href={`/${item.slug}`}
      onClick={() => handleMenuClose()}
      onMouseEnter={() => handleMegaMenuOpen(item.id)}
    >
      <a
        className={`px-4 py-2 font-bold  block ${
          selectedCategory.id === item.id && 'bg-white'
        }`}
      >
        {item.translation[locale].name}
      </a>
    </Link>
  );
}
