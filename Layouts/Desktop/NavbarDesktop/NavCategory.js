import React from 'react';
import ReactHoverObserver from 'react-hover-observer';
import { AnimatePresence } from 'framer-motion';
import { DataProvider } from '../../../contexts/DataContext';
import AllCategories from './AllCategories';
import NavCategoriesContainer from './NavCategoriesContainer';
import MegaMenu from './MegaMenu';

export default function NavCategory() {
  const dropDownbgRef = React.useRef(null);
  const { navCategories, navCategoriesLoading } = React.useContext(
    DataProvider
  );
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [catData, setCatData] = React.useState(null);

  const handleDropDownOpen = id => {
    const category = navCategories.find(item => item.id === id);
    setCatData(category);
  };

  return (
    <>
      <div
        className="sticky z-10  bg-gray-100 text-nav-cat-text-light"
        style={{ top: '56px' }}
      >
        <div className="max-w-default mx-auto  px-4 ">
          <div className="relative flex justify-center">
            {hideAllCategories && (
              <AllCategories navCategories={navCategories} />
            )}
            <ReactHoverObserver hoverDelayInMs={300}>
              <NavCategoriesContainer
                data={navCategories}
                isLoading={navCategoriesLoading}
                handleDropDownOpen={handleDropDownOpen}
                setCatData={setCatData}
                setDropDownOpen={setDropDownOpen}
                catData={catData}
              />
              <AnimatePresence>
                {dropDownOpen && <MegaMenu data={catData} />}
              </AnimatePresence>
            </ReactHoverObserver>
          </div>
        </div>
      </div>
      <div
        ref={dropDownbgRef}
        className=" z-9 hidden absolute top-0 left-0 w-full  min-h-full bg-gray-700 opacity-50  "
      />
    </>
  );
}
