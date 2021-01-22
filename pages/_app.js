import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import AuthContext from '../contexts/AuthContext';
import CartAndWishlistContext from '../contexts/CartAndWishlistContext';
import DataContext from '../contexts/DataContext';
import '../styles/tailwind.css';
import '../styles/styles.css';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthContext>
          <DataContext>
            <CartAndWishlistContext>
              <div className={`${locale === 'ar' ? 'rtl' : ''}`}>
                <Component {...pageProps} />
              </div>
            </CartAndWishlistContext>
          </DataContext>
        </AuthContext>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
