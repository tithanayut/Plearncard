import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			name: "Plerncard Account",
			async authorize(credentials) {
				// TODO
				return { username: "dev" };
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
