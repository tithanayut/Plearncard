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
		let result;
		const client = new MongoClient(uri);
		try {
			await client.connect();
			result = await client
				.db("plearncard")
				.collection("users")
				.findOne({ _id: ObjectId(userId) });
		} catch {
			return res.status(500).json({ errors: ["Database connection failed"] });
		} finally {
			await client.close();
		}

		return res.status(200).json(result);
	} else if (req.method === "DELETE") {
		const client = new MongoClient(uri);
		try {
			await client.connect();
			// Delete from users
			await client
				.db("plearncard")
				.collection("users")
				.deleteOne({ _id: ObjectId(userId) });
			// Delete from accounts
			await client
				.db("plearncard")
				.collection("accounts")
				.deleteOne({ userId: ObjectId(userId) });
			// Delete cards
			await client.db("plearncard").collection("cards").deleteMany({ userId });
		} catch {
			return res.status(500).json({ errors: ["Database connection failed"] });
		} finally {
			await client.close();
		}

		return res.status(200).json({ message: "Account deleted" });
	}

	return res.status(405).json({ errors: ["Method not allowed"] });
};
