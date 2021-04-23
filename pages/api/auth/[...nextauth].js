import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";
import { validate } from "../../../utils/password";

const uri = process.env.MONGODB_URI;

export default NextAuth({
	session: {
		jwt: true,
	},
	jwt: {
		secret: process.env.SECRET,
	},
	providers: [
		Providers.Credentials({
			name: "Plearncard Account",
			async authorize(credentials) {
				if (!credentials.username || !credentials.password) {
					throw new Error("Please fill in username and password");
				}

				const username = credentials.username.trim().toLowerCase();

				const client = new MongoClient(uri);
				let user;
				try {
					await client.connect();
					user = await client
						.db("plearncard")
						.collection("users")
						.findOne({
							username,
						});
				} catch (err) {
					throw new Error("Database connection failed");
				} finally {
					await client.close();
				}

				// Check if user exists
				if (!user) {
					throw new Error("Username or password incorrect");
				}

				// Compare password
				const result = await validate(
					credentials.password,
					user.password
				);
				if (!result) {
					throw new Error("Username or password incorrect");
				}

				return {
					username,
				};
			},
		}),
	],
	callbacks: {
		jwt: async (token, user) => {
			if (user) {
				token.user = user;
			}
			return Promise.resolve(token);
		},
		session: async (session, user) => {
			session.user = user.user;
			return Promise.resolve(session);
		},
	},
});
