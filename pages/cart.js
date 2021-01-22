import dynamic from 'next/dynamic';
import isMobile from '../utils/isMobile';
import Layout from '../Layouts/Layout';

const Cart = dynamic(() => import('../components/Cart/CartDesktop/Cart'));
const CartMobile = dynamic(() =>
  import('../components/Cart/CartMobile/CartMobile')
);
export default function cart() {
  const isMobileDevice = isMobile();
  return <Layout>{isMobileDevice ? <CartMobile /> : <Cart />}</Layout>;
}
