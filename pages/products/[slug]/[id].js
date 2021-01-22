import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSingleItem } from '../../../utils/queries';
import isMobile from '../../../utils/isMobile';
import Layout from '../../../Layouts/Layout';

const SingleProductDesktop = dynamic(() =>
  import('../../../components/SingleProduct/Desktop/SingleProductDesktop')
);
const SingleProductMobile = dynamic(() =>
  import('../../../components/SingleProduct/Mobile/SingleProductMobile')
);

export default function SingleProduct() {
  const isMobileDevice = isMobile();
  return (
    <Layout>
      {isMobileDevice ? <SingleProductMobile /> : <SingleProductDesktop />}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['singleProduct', id], () =>
    getSingleItem(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }, // will be passed to the page component as props
  };
}
