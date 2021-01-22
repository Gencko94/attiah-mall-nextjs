import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { BiCaretDown } from 'react-icons/bi';
import Loader from 'react-loader-spinner';
import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';
import { DataProvider } from '../../../contexts/DataContext';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import useClickAway from '../../../utils/useClickAway';

export default function ShipTo() {
  const {
    deliveryCountry,
    deliveryCountries,
    deliveryCountriesLoading,
    setDeliveryCountry,
  } = React.useContext(DataProvider);
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [countryListOpen, setCountryListOpen] = React.useState(false);
  const countryListRef = React.useRef(null);
  useClickAway(countryListRef, () => {
    if (countryListOpen) {
      setCountryListOpen(false);
    }
  });
  const toggleCountryList = () => {
    setCountryListOpen(!countryListOpen);
  };

  const countryListVariants = {
    hidden: {
      height: 0,
    },
    visible: {
      height: 'auto',
      transition: {
        type: 'tween',
      },
    },
    exited: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  const handleChangeDeliveryCountry = country => {
    localStorage.setItem(
      'deliveryCountry',
      JSON.stringify({
        deliveryCountry: {
          en: country.translation.en.name,
          ar: country.translation.ar.name,
        },
      })
    );
    setDeliveryCountry(country);
  };
  if (deliveryCountriesLoading) {
    return null;
  }
  return (
    <div className="relative">
      {deliveryCountriesLoading && (
        <div className="p-1">
          <Loader
            type="ThreeDots"
            color="#fff"
            secondaryColor="black"
            height={22}
            width={22}
            visible={deliveryCountriesLoading}
          />
        </div>
      )}
      {!deliveryCountriesLoading && (
        <button
          onClick={toggleCountryList}
          className=" p-1 flex items-center rounded hover:bg-main-color  transition duration-100"
        >
          <h1 className="text-sm uppercase ">{t`common:ship-to`}</h1>
          <div
            className="mx-2"
            style={{
              position: 'relative',
              backgroundColor: '#f7f7fa',
              paddingBottom: '20px',
              width: '20px',
              borderRadius: '50%',
            }}
          >
            <div className="absolute top-0 left-0">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${deliveryCountry?.flag.link}`}
                alt=""
              />
            </div>
          </div>

          <BiCaretDown />
        </button>
      )}

      <AnimatePresence>
        {countryListOpen && (
          <motion.div
            variants={countryListVariants}
            initial="hidden"
            animate="visible"
            exit="exited"
            ref={countryListRef}
            className="absolute top-full rounded z-30 mt-1 overflow-hidden text-body-text-light font-semibold   bg-gray-100"
          >
            {deliveryCountries.map(country => {
              return (
                <button
                  key={country.id}
                  onClick={() => {
                    handleChangeDeliveryCountry(country);
                    toggleCountryList();
                  }}
                  className="p-4 text-xs flex w-full uppercase items-center font-semibold  hover:bg-main-color"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full text-main-color mx-1"
                    checked={
                      deliveryCountry.translation[locale].name ===
                      country.translation[locale].name
                    }
                    readOnly
                  />
                  <div className="flex">
                    <div
                      className="mx-2"
                      style={{
                        position: 'relative',
                        backgroundColor: '#f7f7fa',
                        paddingBottom: '20px',
                        width: '20px',
                        borderRadius: '50%',
                      }}
                    >
                      <div className="absolute top-0 left-0">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/small/${country.flag.link}`}
                          alt={country.code}
                        />
                      </div>
                    </div>

                    <h1>{country.translation[locale].name}</h1>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
