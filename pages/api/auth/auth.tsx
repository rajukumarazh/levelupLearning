// import { withSessionRoute } from "pages/lib/config/withSession";
import { withSessionRoute } from "@/lib/config/withSession";
import type { NextApiRequest, NextApiResponse } from "next";
const VALID_EMAIL = "test@gmail.com";
const VALID_PASSWORD = "password";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { email, password } = req.body;
		if (typeof email == "string" && typeof password === "string") {
			req.session.user = {
				username: email,
				isAdmin: true,
			};
			await req.session.save();
			res.send({ ok: true });
		}
		return res.status(403).send("");
	}
	return res.status(404).send("");
}
