import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from './scratch/Footer';
import Navigation from './scratch/Navigation';
import useLocation from 'react';
import { Provider } from 'react-redux';
import { store } from '..//lib/toolkit/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
function App({ Component, pageProps }: AppProps) {
	const stripePromise = loadStripe(
		'pk_test_51LJuX6SHMCr56R0SHodUFGJ5IOaLnZo7YygZHqYADZwIzVv1LYsRHQedPB8DhfzXm9shaFUTb2H0sACO5ejMQmp300OPkOGIw1'
	);
	return (
		<div className="">
			<Provider store={store}>
				<Elements stripe={stripePromise}>
					<Navigation />

					<Component {...pageProps} />

					<Footer />
				</Elements>
			</Provider>
		</div>
	);
}
export default App;
