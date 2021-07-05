import { MongoClient } from "mongodb";
import jwt from "next-auth/jwt";
import cuid from "cuid";

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
        let sort = {};
        let limit = 0;

        if (typeof req.query.recent !== "undefined") {
            sort = { lastViewedAt: -1 };
            limit = parseInt(req.query.recent);
        }

        let result;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            result = await client
                .db("plearncard")
                .collection("cards")
                .find(
                    { userId },
                    {
                        projection: {
                            _id: 1,
                            name: 1,
                            total: 1,
                            createdAt: 1,
                        },
                    }
                )
                .sort(sort)
                .limit(limit)
                .toArray();
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(200).json(result);
    } else if (req.method === "POST") {
        if (!req.body.topic) {
            return res
                .status(400)
                .json({ errors: ["Request body not complete"] });
        }

        const topic = req.body.topic.trim();
        const description = req.body.description.trim() || "";

        let result;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            result = await client
                .db("plearncard")
                .collection("cards")
                .insertOne({
                    userId,
                    name: topic,
                    description,
                    total: 0,
                    cards: [],
                    createdAt: new Date(),
                    lastViewedAt: new Date(),
                });
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(201).json({ insertedId: result.insertedId });
    }

    return res.status(405).json({ errors: ["Method not allowed"] });
};
