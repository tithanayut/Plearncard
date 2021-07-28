import { MongoClient, ObjectId } from "mongodb";
import extractAuthJWT from "../../helpers/auth/extractAuthJWT";

const uri = process.env.MONGODB_URI;

export default async (req, res) => {
    const token = await extractAuthJWT(req);
    if (!token) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }

    const userId = token.sub;
    const client = new MongoClient(uri);
    if (req.method === "GET") {
        let user;
        try {
            await client.connect();
            user = await client
                .db("plearncard")
                .collection("users")
                .findOne({ _id: ObjectId(userId) });
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(200).json(user);
    } else if (req.method === "DELETE") {
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
            // Delete from cards
            await client
                .db("plearncard")
                .collection("cards")
                .deleteMany({ userId });
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(200).json({ message: "Account deleted" });
    }

    return res.status(405).json({ errors: ["Method not allowed"] });
};
