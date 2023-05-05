import type { NextApiRequest, NextApiResponse } from 'next';
// import category from '../../../Models/Category';
import connectDB from '@/utils/connectDB';
import cors from 'cors';
import NextCors from 'nextjs-cors';
import Course from '@/Models/Course';
// import Theory from '@/Models/Theory';
import Theory from '@/Models/Reports';
import { add_current_course } from '@/lib/toolkit/CourseSlice';
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
	const add_theory = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;

		let dt = await Theory.create(data);
		console.log('data', dt);
		// try {
		// 	res.status(200).json({
		// 		message: "inserted successfully please check your database ",
		// 	});
		// } catch (error) {
		// 	return res.status(401).json({ error: "Something went wrong" });
		// }
	};
	const get_theory = async (req: NextApiRequest, res: NextApiResponse) => {
		let receiveddata = await Theory.find();
		console.log('kkkkkkk', receiveddata);
		res.status(200).json(receiveddata);
	};
	const getTheoryByCourse = async (
		req: NextApiRequest,
		res: NextApiResponse
	) => {
		const result = await Course.aggregate([
			{
				$lookup: {
					from: 'theories',
					localField: '_id',
					foreignField: 'course_id',
					as: 'coursed_theory',
				},
				// $lookup: {
				// 	from: 'students',
				// 	localField: '_id',
				// 	foreignField: 'user_id',
				// 	as: 'user_details',
				// },
			},
		]);

		let filteredTheory = result?.filter((curr) => {
			return curr?._id == req.body.course;
		});
		console.log('helloCousrse', filteredTheory);
		// let relationWithTheory = await Theory.find();
		res.status(200).json(filteredTheory);
	};
	if (req.method === 'GET') {
		// Handle GET request
		await get_theory(req, res);
	} else if (req.method === 'POST' && !req.body.hasOwnProperty('course')) {
		// Handle POST request
		await add_theory(req, res);
	} else if (req.method === 'POST' && req.body.course.length > 0) {
		// Handle another POST request
		console.log('working', req.body.course.length);
		await getTheoryByCourse(req, res);
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
