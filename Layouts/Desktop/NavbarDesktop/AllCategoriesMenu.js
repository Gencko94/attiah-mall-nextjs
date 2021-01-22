import React from 'react';
import { motion } from 'framer-motion';
import ReactHoverObserver from 'react-hover-observer';
import AllCategoriesButton from './AllCategoriesButton';

export default function AllCategoriesMenu({
  categories,
  selectedCategory,
  handleMegaMenuOpen,
  handleMenuClose,
}) {
  const containerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: '500px',
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.1,
        ease: 'linear',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'tween',
        duration: 0.1,
        ease: 'linear',
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      className={` all-categories__menu bg-nav-cat-light text-nav-cat-text-light text-sm`}
    >
      <div className=" ">
        {categories.map(item => {
          return (
            <ReactHoverObserver key={item.id} hoverDelayInMs={300}>
              <AllCategoriesButton
                item={item}
                handleMegaMenuOpen={handleMegaMenuOpen}
                handleMenuClose={handleMenuClose}
                selectedCategory={selectedCategory}
              />
            </ReactHoverObserver>
          );
        })}
      </div>
    </motion.div>
  );
}
