import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { MongoClient } from "mongodb";

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
        Providers.Credentials({
            name: "Test User",
            credentials: {},
            async authorize() {
                const client = new MongoClient(uri);
                let user;
                try {
                    await client.connect();
                    user = await client
                        .db("plearncard")
                        .collection("users")
                        .insertOne({
                            name: "Test User",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                } catch (err) {
                    throw new Error("Database connection failed");
                } finally {
                    await client.close();
                }
                return { id: user.insertedId, name: "Test User" };
            },
        }),
    ],
});
