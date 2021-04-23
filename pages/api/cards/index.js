import { MongoClient } from "mongodb";
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

	const username = token.user.username;

	if (req.method === "GET") {
		const client = new MongoClient(uri);
		try {
			await client.connect();
			const result = await client
				.db("plearncard")
				.collection("cards")
				.find(
					{ username },
					{
						projection: {
							_id: 0,
							slug: 1,
							name: 1,
							total: 1,
							createdAt: 1,
						},
					}
				)
				.toArray();

			return res.status(200).json(result);
		} catch {
			return res
				.status(500)
				.json({ errors: ["Database connection failed"] });
		} finally {
			await client.close();
		}
	}

	return res.status(405).json({ errors: ["Method not allowed"] });
};
