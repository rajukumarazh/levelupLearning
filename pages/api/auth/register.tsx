import type { NextApiRequest, NextApiResponse } from 'next';
// import category from '../../../Models/Category';
import connectDB from '@/utils/connectDB';
import cors from 'cors';
import NextCors from 'nextjs-cors';
import User from '@/Models/Auth/User';
const corsOptions = {
	origin: '*',
};
async function handler(req: NextApiRequest, res: NextApiResponse) {
	await NextCors(req, res, {
		// Options
		methods: ['POST'],
		origin: '*',
		optionsSuccessStatus: 200,
	});
	await connectDB();
	const add_course = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;
		let dt;
		if (data?.Password === data?.Confirm_Password) {
			dt = await User.create(data);
			console.log('data', dt);
		} else {
			return res
				.status(401)
				.json({ error: 'password and confirm password are not equal' });
		}

		try {
			if (dt?.First_Name) {
				res.status(200).json({
					message: 'inserted successfully please check your database ',
				});
			}
		} catch (error) {
			return res.status(401).json({ error: 'Something went wrong' });
		}
	};
	// const get_course = async (req: NextApiRequest, res: NextApiResponse) => {
	// 	let receiveddata = await Course.find();
	// 	console.log('kkkkkkk', receiveddata);
	// 	res.status(200).json(receiveddata);
	// };

	switch (req.method) {
		case 'POST':
			await add_course(req, res);
			break;
		// case 'GET':
		// 	await get_course(req, res);
		// 	break;
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
export default handler;
