import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function Checkout() {
	const stripe = useStripe();
	const elements = useElements();
	const [amount, setAmount] = useState<number>(1000);
	const [clientSecret, setClientSecret] = useState<string>('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await fetch('/api/payment/payment_intent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				price: 100 * 100,
				currency: 'usd',
			}),
			// body: JSON.stringify({ amount }),
		});
		const { client_secret } = await response.json();
		setClientSecret(client_secret);
	};

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
			}
		);
		if (error) {
			console.log(error);
		} else {
			console.log('paymentIntent', paymentIntent);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Amount:
					<input
						type="number"
						value={amount}
						onChange={(event) => setAmount(parseInt(event.target.value))}
					/>
				</label>
				<CardElement />
				<button type="submit">Pay</button>
			</form>
			<button onClick={handlePayment}>Complete Payment</button>
		</div>
	);
}
