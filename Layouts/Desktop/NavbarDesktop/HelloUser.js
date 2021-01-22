import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import useClickAway from '../../../utils/useClickAway';
import { AuthProvider } from '../../../contexts/AuthContext';

export default function HelloUser() {
  const { t } = useTranslation();
  const { userLogoutMutation, userData } = React.useContext(AuthProvider);
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  /**
   * Main Fetch
   */
  useClickAway(menuRef, () => {
    if (open) {
      setOpen(false);
    }
  });
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    exited: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.1,
      },
    },
  };
  return (
    <div
      className={`${
        open && 'bg-main-color'
      } rounded text-body-light relative hover:bg-main-color`}
    >
      <button className="flex p-1 items-center" onClick={() => setOpen(!open)}>
        <h1 className="font-semibold">
          {t`common:welcome-user`}
          {userData.name} !
        </h1>
        <span className="mx-1" />
        <BiChevronDown className="w-5 h-5 " />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exited"
            ref={menuRef}
            className="absolute top-100 left-0 w-full overflow-hidden text-base z-30 bg-body-light mt-1 text-body-text-light rounded shadow"
          >
            <div className="  font-normal hover:bg-main-color hover:text-main-text">
              <Link href="/user/account">
                <a className=" p-2 w-full inline-block text-center">
                  {t`common:my-account`}
                </a>
              </Link>
            </div>
            <div className="  font-normal hover:bg-main-color hover:text-main-text">
              <Link href="/vieweditems">
                <a className=" p-2 w-full inline-block text-center">
                  {t`common:viewed-items`}
                </a>
              </Link>
            </div>
            <div className=" hover:bg-main-color hover:text-main-text">
              <button
                className=" w-full p-2 inline-block"
                onClick={userLogoutMutation}
              >
                {t`common:logout`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
