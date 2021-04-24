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
	database: uri,
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Providers.WordPress({
			clientId: process.env.WORDPRESS_CLIENT_ID,
			clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
		}),
	],
});
