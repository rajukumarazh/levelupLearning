import { useEffect, useState } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { withSessionSsr } from '@/lib/config/withSession';
import Router, { useRouter } from 'next/router';
import { add_login_status } from '../../lib/toolkit/CourseSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function Checkout(props: any) {
	console.log('userPorps', props);
	let dispatch = useDispatch();
	const stripe = useStripe();
	let router = useRouter();
	const elements = useElements();
	let allState = useSelector((state) => state);
	console.log('allState', allState);
	useEffect(() => {
		async function callPay() {
			const response = await fetch('/api/payment/payment_intent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					price: allState?.courses?.current_course[0]?.price * 100,
					currency: 'usd',
					// data: {
					// 	user_id: _id,
					// 	emai: email,
					// 	password: password,
					// 	course_id: allState?.courses?.current_course[0]?._id,
					// },
				}),
				// body: JSON.stringify({ amount }),
			});
			const { client_secret } = await response.json();
			setClientSecret(client_secret);
			console.log('clientSecret', clientSecret);
		}
		if (props?.user?.username !== undefined) {
			console.log('helloChekout', props);
			callPay();
			// dispatch(add_login_status({ user: props?.user, status: true }));
			// router.push('/course/Ongoing_course');
		} else {
			dispatch(add_login_status({ user: null, status: false }));
			router.push('/auth/Login');
			// router.back();
		}
	}, [props]);
	const [amount, setAmount] = useState<number>(1000);
	const [clientSecret, setClientSecret] = useState<string>('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};
	console.log('clientSecret', clientSecret);
	const handlePayment = async () => {
		// let { email, password, _id } = allState?.courses?.current_user?.data;

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
		} else if (paymentIntent?.status == 'succeeded') {
			let enroll = await axios.post('/api/payment/enrollments', {
				user_id: allState?.courses?.current_user?.data?._id,
				course_id: allState?.courses?.current_course[0]?._id,
				user: allState?.courses?.current_user.data?.Email,
			});
			console.log('paidData', enroll);
			// console.log("paymentIntent", paymentIntent);
			router.push('/payment/payment_Success');
		}
		let sentReport = await axios.post('/api/payment/reports', {
			user_id: allState?.courses?.current_user?.data?._id,
			course: allState?.courses?.current_course[0],
			// user: allState?.courses?.current_user.data,
		});
	};

	useEffect(() => {
		if (props?.error === 'notfound') {
			router.push('/auth/Login');
		}
	}, [props]);
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Amount: {`${allState?.courses?.current_course[0].price}`}&nbsp; &nbsp;
					{/* <input
						type="number"
						value={`${allState?.courses?.current_course[0].price}`}
						onChange={(event) => setAmount(parseInt(event.target.value))}

					/> */}
				</label>
				<CardElement options={{ hidePostalCode: true }} />
			</form>
			<button
				onClick={handlePayment}
				className="bg-green-400 text-white px-2 py-2 rounded-lg shadow-md hover:bg-red-500 font-bold w-24 m-2 "
			>
				Pay
			</button>
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
			props: { error: 'notfound' },
		};
	}

	return {
		props: { user },
	};
});
