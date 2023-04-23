import { useEffect, useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { withSessionSsr } from "@/lib/config/withSession";
import Router, { useRouter } from "next/router";
export default function Checkout(props: any) {
	console.log("userPorps", props);
	const stripe = useStripe();
	let router = useRouter();
	const elements = useElements();
	const [amount, setAmount] = useState<number>(1000);
	const [clientSecret, setClientSecret] = useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch("/api/payment/payment_intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				price: 100 * 100,
				currency: "usd",
			}),
			// body: JSON.stringify({ amount }),
		});
		const { client_secret } = await response.json();
		setClientSecret(client_secret);
	};
	console.log("clientSecret", clientSecret);
	const handlePayment = async () => {
		const cardElement = elements?.getElement(CardElement);
		if (!stripe || !cardElement) {
			return;
		}
		const { error, paymentIntent } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: cardElement,
				},
			},
		);
		if (error) {
			console.log(error);
		} else if (paymentIntent?.status == "succeeded") {
			// console.log("paymentIntent", paymentIntent);
			router.push("/payment/payment_Success");
		}
	};
	useEffect(() => {
		if (props?.error === "notfound") {
			router.push("/auth/Login");
		}
	}, [props]);
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Amount:
					<input
						type="number"
						value={amount}
						onChange={(event) =>
							setAmount(parseInt(event.target.value))
						}
					/>
				</label>
				<CardElement />
				<button type="submit">Pay</button>
			</form>
			<button onClick={handlePayment}> complete payment</button>
		</div>
	);
}
export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
	const user = req.session.user;

	if (!user) {
		// return {
		// 	notFound: true,
		// };
		return {
			props: { error: "notfound" },
		};
	}

	return {
		props: { user },
	};
});
