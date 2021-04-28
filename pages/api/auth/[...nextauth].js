import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	session: {
		jwt: true,
	},
	jwt: {
		secret: process.env.SECRET,
	},
	database: uri,
	providers: [
		Providers.Twitter({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET,
		}),
		Providers.LINE({
			clientId: process.env.LINE_CLIENT_ID,
			clientSecret: process.env.LINE_CLIENT_SECRET,
		}),
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
