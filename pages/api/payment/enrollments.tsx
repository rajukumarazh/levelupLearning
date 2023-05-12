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

		let dt = await Enrollment.create(data);
		console.log('data', data);
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
	const get_enrolled_courses = async (
		req: NextApiRequest,
		res: NextApiResponse
	) => {
		let data = req.body;
		console.log('daataaaa', data);
		// let receiveddata = await Enrollment.find();
		const result = await Enrollment.aggregate([
			{
				$lookup: {
					from: 'courses',
					localField: 'course_id',
					foreignField: '_id',
					as: 'enrolled_course',
				},
			},
			{
				$lookup: {
					from: 'theories',
					localField: 'course_id',
					foreignField: 'course_id',
					as: 'course_theories',
				},
			},
		]);
		let courses = result
			?.filter((curr) => {
				if (curr?.user_id?.toString() === data?.userid) {
					return {
						curr,
					};
				}
			})
			.map((curr) => {
				return curr;
			});

		console.log('enrolledCourses', courses);
		res.status(200).json(courses);
	};

	if (req.method === 'GET') {
		// Handle GET request
		await get_enrolled_courses(req, res);
	} else if (req.method === 'POST' && req.body.hasOwnProperty('userid')) {
		// Handle POST request
		await get_enrolled_courses(req, res);
	} else if (req.method === 'POST') {
		await add_Enrollments(req, res);
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
