// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import connectDB from "utils/connectDB";
import connectDB from "../../utils/connectDB";
type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	await connectDB();
	res.status(200).json({ name: "John Doe" });
}
