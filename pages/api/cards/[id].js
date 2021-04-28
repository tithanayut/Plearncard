import { MongoClient, ObjectId } from "mongodb";
import jwt from "next-auth/jwt";

const uri = process.env.MONGODB_URI;
const secret = process.env.SECRET;

export default async (req, res) => {
	// Authorization
	let token;
	try {
		token = await jwt.getToken({ req, secret });
	} catch {
		return res
			.status(401)
			.json({ errors: ["Token verification failed", "Unauthorized"] });
	}
	if (!token) {
		return res.status(401).json({ errors: ["Unauthorized"] });
	}

	const userId = token.sub;

	if (req.method === "GET") {
		if (!req.query.id) {
			return res
				.status(400)
				.json({ errors: ["Request body not complete"] });
		}

		const slug = req.query.id;

		let result;
		const client = new MongoClient(uri);
		try {
			await client.connect();
			result = await client
				.db("plearncard")
				.collection("cards")
				.findOneAndUpdate(
					{ userId, slug },
					{
						$set: {
							lastViewedAt: new Date(),
						},
					}
				);
		} catch {
			return res
				.status(500)
				.json({ errors: ["Database connection failed"] });
		} finally {
			await client.close();
		}

		if (!result.value) {
			return res.status(404).json({ errors: ["Not found"] });
		}

		return res.status(200).json(result.value);
	}

	return res.status(405).json({ errors: ["Method not allowed"] });
};
