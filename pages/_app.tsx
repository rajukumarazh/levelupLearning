import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "./scratch/Footer";
import Navigation from "./scratch/Navigation";
import useLocation from "react";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="">
			<Navigation />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}
