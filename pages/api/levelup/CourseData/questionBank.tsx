import type { NextApiRequest, NextApiResponse } from 'next';
// import category from '../../../Models/Category';
import connectDB from '@/utils/connectDB';
import cors from 'cors';
import NextCors from 'nextjs-cors';
import Bank from '@/Models/Bank';
// import Theory from '@/Models/Theory';
// import QuestionBank from '@/Models/QuestionBank';

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
	const add_qeustion = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;
		console.log('dataTheory', req.body);

		let dt = await Bank.create(data);
		console.log('data', dt);
		try {
			res.status(200).json({
				message: 'inserted successfully please check your database ',
				data: dt,
			});
		} catch (error) {
			return res.status(401).json({ error: 'Something went wrong' });
		}
	};
	const get_questions = async (req: NextApiRequest, res: NextApiResponse) => {
		let receiveddata = await Bank.find();
		console.log('kkkkkkk', receiveddata);
		res.status(200).json(receiveddata);
	};
	switch (req.method) {
		case 'POST':
			await add_qeustion(req, res);
			break;
		case 'GET':
			await get_questions(req, res);
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
export default handler;
