import Link from 'next/link';
import React from 'react';

import { DataProvider } from '../../../contexts/DataContext';

export default function Logo() {
  const { settings } = React.useContext(DataProvider);

  return (
    <div
      className=" flex items-center justify-center"
      style={{ flexBasis: '120px' }}
    >
      {settings && (
        <Link style={{ width: '100px' }} href="/" className="-m-2">
          <a>
            <img
              src={settings?.store_logo}
              alt="MRG-logo"
              style={{ width: 'auto', maxHeight: '40px' }}
            />
          </a>
        </Link>
      )}
    </div>
  );
}
