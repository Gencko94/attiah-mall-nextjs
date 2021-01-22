import React from 'react';
import ContentLoader from 'react-content-loader';

export default function SingleProductMobileLoader() {
  return (
    <>
      <ContentLoader
        speed={2}
        viewBox="0 0 420 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
      </ContentLoader>
      <div className="flex flex-col w-full  px-3 py-2 bg-white">
        <ContentLoader
          speed={2}
          viewBox="0 0 480 470"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
          <rect x="0" y="60" rx="5" ry="5" width="90%" height="40" />
          <rect x="0" y="120" rx="5" ry="5" width="80%" height="40" />
          <rect x="0" y="180" rx="5" ry="5" width="70%" height="35" />
          <rect x="0" y="240" rx="5" ry="5" width="60%" height="35" />
          <rect x="0" y="300" rx="5" ry="5" width="40%" height="35" />
          <rect x="0" y="360" rx="5" ry="5" width="60%" height="35" />
          <rect x="0" y="420" rx="5" ry="5" width="40%" height="35" />
        </ContentLoader>
        <hr />
        <ContentLoader
          speed={2}
          viewBox="0 0 480 100"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="20" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="60" rx="5" ry="5" width="49%" height="25" />
          <rect x="50%" y="60" rx="5" ry="5" width="50%" height="25" />
        </ContentLoader>
      </div>
    </>
  );
}
