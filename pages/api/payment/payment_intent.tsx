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
	const { amount } = req.body;
	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'usd',
	});
	// console.log('paymentIntent', paymentIntent.client_secret);
	res.status(200).json({ client_secret: paymentIntent.client_secret });
};
