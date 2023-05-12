import type { NextApiRequest, NextApiResponse } from 'next';
// import category from '../../../Models/Category';
import connectDB from '@/utils/connectDB';
import cors from 'cors';
import NextCors from 'nextjs-cors';
import Course from '@/Models/Course';
import Report from '../../../Models/Report';

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
	const get_reports = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;
		console.log('daataaaa', data?.user_id.toString());
		// let dt = await Enrollment.findById({ user_id: data?.user_id });
		let dt = await Report.find();
		console.log('dt', dt);
		try {
			res.status(200).json({
				reports: dt,
			});
		} catch (error) {
			return res
				.status(401)
				.json({ error: 'Something went wrong in collecting reports' });
		}
	};
	const add_reports = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;
		console.log('daataaaa', data);
		let dt = await Report.create(data);
		try {
			res.status(200).json({
				reports: dt,
			});
		} catch (error) {
			return res
				.status(401)
				.json({ error: 'Something went wrong in collecting reports' });
		}
	};

	// 	switch (req.method) {
	// 		case 'POST':
	// 			await add_reports(req, res);
	// 			break;
	// 		case 'GET':
	// 			await get_reports(req, res);
	// 			break;
	// 		// case 'PUT':
	// 		// 	await update_cart_data(req, res);
	// 		// 	break;
	// 		// case 'DELETE':
	// 		// 	await delete_cart_data(req, res);
	// 		// 	break;
	// 		default:
	// 			return res.status(405).end(`Method ${req.method} Not Allowed`);
	// 	}
	// }
	if (req.method === 'GET') {
		// Handle GET request
		// await get_reports(req, res);
	} else if (req.method === 'POST' && req.body.hasOwnProperty('user_id')) {
		// Handle POST request
		await get_reports(req, res);
	} else if (req.method === 'POST') {
		// await add_reports(req, res);
		// Handle another POST request
		// await getTheoryByCourse(req, res);
		// Delete something with the id
		// res
		// 	.status(200)
		// 	.json({ message: `Deleted item ${id}. This is another POST request.` });
	} else {
		// Handle other types of requests
		res.status(405).json({ message: 'Method not allowed.' });
	}
	// switch (req.method) {
	// 	case 'POST':
	// 		await add_theory(req, res);
	// 		break;
	// 	case 'GET':
	// 		await get_theory(req, res);
	// 		break;
	// 	// case 'PUT':
	// 	// 	await update_cart_data(req, res);
	// 	// 	break;
	// 	// case 'DELETE':
	// 	// 	await delete_cart_data(req, res);
	// 	// 	break;
	// 	default:
	// 		return res.status(405).end(`Method ${req.method} Not Allowed`);
	// }
}
export default handler;
