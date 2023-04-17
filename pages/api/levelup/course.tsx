import type { NextApiRequest, NextApiResponse } from 'next';
// import category from '../../../Models/Category';
import connectDB from '@/utils/connectDB';

import Course from '@/Models/Course';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectDB();
	const add_course = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;

		let dt = Course.create(data);
		console.log('data', dt);
		try {
			res.status(200).json({
				message: 'inserted successfully please check your database ',
			});
		} catch (error) {
			return res.status(401).json({ error: 'Something went wrong' });
		}
	};
	const get_course = async (req: NextApiRequest, res: NextApiResponse) => {
		let receiveddata = await Course.find();
		console.log('kkkkkkk', receiveddata);
		res.status(200).json(receiveddata);
	};
	switch (req.method) {
		case 'POST':
			await add_course(req, res);
			break;
		case 'GET':
			await get_course(req, res);
			break;
		// case 'PUT':
		// 	await update_cart_data(req, res);
		// 	break;
		// case 'DELETE':
		// 	await delete_cart_data(req, res);
		// 	break;
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
