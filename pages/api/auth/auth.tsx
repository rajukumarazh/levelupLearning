// import { withSessionRoute } from "pages/lib/config/withSession";
import { withSessionRoute } from '@/lib/config/withSession';
import type { NextApiRequest, NextApiResponse } from 'next';
const VALID_EMAIL = 'test@gmail.com';
const VALID_PASSWORD = 'password';
import connectDB from '@/utils/connectDB';
export default withSessionRoute(createSessionRoute);
import User from '@/Models/Auth/User';
async function createSessionRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email, password } = req.body;
		await connectDB();
		// if (typeof email == 'string' && typeof password === 'string') {
		// 	req.session.user = {
		// 		username: email,
		// 		isAdmin: true,
		// 	};
		// 	await req.session.save();
		// 	res.send({ ok: true });
		// }
		const user = await User.findOne({
			Email: email.toLowerCase(),
			Password: password,
		});
		if (user) {
			req.session.user = {
				username: email,
				isAdmin: true,
			};
			await req.session.save();
			console.log('dtataa', user);
			res.send({ message: 'successfully login', data: user, ok: true });
		}
		return res.status(403).send('');
	}
	return res.status(404).send('');
}
