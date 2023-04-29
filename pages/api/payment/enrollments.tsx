import type { NextApiRequest, NextApiResponse } from 'next';
// import category from '../../../Models/Category';
import connectDB from '@/utils/connectDB';
import cors from 'cors';
import NextCors from 'nextjs-cors';
import Course from '@/Models/Course';
import Enrollment from '../../../Models/Enrollments';
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
	const add_Enrollments = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;
		console.log('daataaaa', data);
		let dt = await Enrollment.create(data);
		try {
			res.status(200).json({
				message: ' Now You are successfully registered with this course!!',
				couse: data,
			});
		} catch (error) {
			return res
				.status(401)
				.json({ error: 'Something went wrong in enrollment process' });
		}
	};
	// const get_course = async (req: NextApiRequest, res: NextApiResponse) => {
	// 	let receiveddata = await Course.find();
	// 	console.log('kkkkkkk', receiveddata);
	// 	res.status(200).json(receiveddata);
	// };
	switch (req.method) {
		case 'POST':
			await add_Enrollments(req, res);
			break;
		case 'GET':
		// await get_course(req, res);
		// break;
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
