import React from 'react';
import { BiCaretRight, BiCaretLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import LazyImage from '../../helpers/LazyImage';
export default function AllCategoriesMegaMenu({
  selectedCategory,
  handleMenuClose,
}) {
  const { locale, formatMessage } = useIntl();

  const clipPathHidden =
    locale === 'ar'
      ? 'polygon(99% 0, 100% 0, 100% 100%, 99% 100%)'
      : 'polygon(0 0, 0 0, 0 100%, 0 100%)';
  const clipPathVisible =
    locale === 'ar'
      ? ' polygon(1% 0, 100% 0, 100% 100%, 1% 100%)'
      : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  const containerVariants = {
    hidden: {
      clipPath: clipPathHidden,
    },
    visible: {
      clipPath: clipPathVisible,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      className={`all-categories__megamenu  bg-white text-nav-cat-text-light ${
        locale === 'ar' ? 'right-100' : 'left-100'
      }  `}
    >
      <div className="">
        <div className="flex justify-between items-center py-2 px-3 ">
          <h1 className="" style={{ fontWeight: 800 }}>
            {selectedCategory.translation[locale].name}
          </h1>
          <Link
            to={`/${locale}/${selectedCategory.slug}`}
            onClick={() => handleMenuClose()}
            className="text-sm font-normal hover:text-main-color underline flex items-center transition duration-75 "
          >
            <span className="mx-2">{formatMessage({ id: 'see-all-nav' })}</span>
            <span>{locale === 'ar' ? <BiCaretLeft /> : <BiCaretRight />}</span>
          </Link>
        </div>
        <hr />
        <h1 className="p-3 text-lg" style={{ fontWeight: 800 }}>
          {formatMessage({ id: 'sections' })}
        </h1>
        <div className="all-categories__grid p-3 ">
          {selectedCategory.children.map(item => {
            return (
              <Link
                to={`/${locale}/${item.slug}`}
                onClick={() => handleMenuClose()}
                key={item.id}
                className="px-2 py-1 flex flex-col justify-center items-center text-sm hover:text-main-color"
              >
                <LazyImage
                  src={item.translation[locale].image?.link}
                  alt={item.translation[locale].name}
                  pb={'100%'}
                />
                <h1
                  className="text-center"
                  style={{ height: '42px', marginTop: '0.25rem' }}
                >
                  {item.translation[locale].name}
                </h1>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
