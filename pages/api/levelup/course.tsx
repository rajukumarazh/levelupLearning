// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import category from "../../../Models/Category";
import connectDB from "@/utils/connectDB";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await connectDB();
	const add_category = async (req: NextApiRequest, res: NextApiResponse) => {
		const data = req.body;
		console.log("data", data);
		let dtst = category.create(data);

		try {
			res.status(200).json({
				message: "inserted successfully please check your database ",
			});
		} catch (error) {
			// console.log('error in adding product to cart (server) => ' + error);
			return res.status(401).json({ error: "Something went wrong" });
		}
	};
	const get_category = async (req: NextApiRequest, res: NextApiResponse) => {
		// const data = req.body;
		// console.log("data");
		res.status(200).json({ message: "name not found" });
		let receiveddata = category.find();
		console.log("kkkkkkk", receiveddata);
		// try {
		// 	res.status(200).json(receiveddata);
		// } catch (error) {
		// 	// console.log('error in adding product to cart (server) => ' + error);
		// 	return res.status(401).json({ error: "not found" });
		// }
	};
	switch (req.method) {
		case "POST":
			await add_category(req, res);
			break;
		case "GET":
			await get_category(req, res);
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
