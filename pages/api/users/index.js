import { MongoClient } from "mongodb";
import { hash } from "../../../utils/password";

const uri = process.env.MONGODB_URI;

export default async (req, res) => {
	if (req.method === "POST") {
		if (!req.body.username || !req.body.password) {
			return res
				.status(400)
				.json({ errors: ["Request body not complete"] });
		}

		const username = req.body.username.trim().toLowerCase();
		if (!/^[a-z0-9]+$/.test(username)) {
			return res
				.status(422)
				.json({ errors: ["Username can only contain a-z and 0-9"] });
		}

		const client = new MongoClient(uri);
		try {
			await client.connect();

			// Check for username availability
			const usernameCheck = await client
				.db("plearncard")
				.collection("users")
				.findOne({
					username,
				});
			if (usernameCheck) {
				return res
					.status(409)
					.json({ errors: ["Username already exists"] });
			}

			// Create user
			const password = await hash(req.body.password);
			await client.db("plearncard").collection("users").insertOne({
				username,
				password,
				createdAt: new Date(),
			});
			return res.status(201).json({ username });
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
