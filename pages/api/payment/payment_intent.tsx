import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2020-08-27',
// });
const stripe = new Stripe(
	'sk_test_51LJuX6SHMCr56R0SJgdCL7BpIp07uBEidLxj92umLzYdIOJCQmDyN5nORCXqwGQQKUkVStMnqhKX1lKoCg46Mytk00oHUSWSRo',
	{ apiVersion: '2022-11-15' }
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { price, currency } = req.body;
	console.log('hello', currency, price);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: price,
		currency: currency,
		description: 'for amazon-clone project',
		shipping: {
			name: 'Random',
			address: {
				line1: '510 Townsend St',
				postal_code: '98140',
				city: 'San Francisco',
				state: 'CA',
				country: 'US',
			},
		},
	});
	console.log('paymentIntent', paymentIntent);
	res.status(200).json({ client_secret: paymentIntent.client_secret });
};
