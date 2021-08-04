import { MongoClient, ObjectId } from "mongodb";
import extractAuthJWT from "../../../helpers/auth/extractAuthJWT";

const uri = process.env.MONGODB_URI;

export default async (req, res) => {
    const token = await extractAuthJWT(req);
    if (!token) {
        return res.status(401).json({ errors: ["Unauthorized"] });
    }

    const userId = token.sub;
    const setId = req.query.id;
    const client = new MongoClient(uri);
    if (req.method === "GET") {
        if (!req.query.id) {
            return res
                .status(400)
                .json({ errors: ["Request body not complete"] });
        }

        let result;
        try {
            await client.connect();
            result = await client
                .db("plearncard")
                .collection("cards")
                .findOneAndUpdate(
                    { userId, _id: ObjectId(setId) },
                    {
                        $set: {
                            lastViewedAt: new Date(),
                        },
                    }
                );
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        if (!result.value) {
            return res.status(404).json({ errors: ["Not found"] });
        }

        return res.status(200).json(result.value);
    } else if (req.method === "PUT") {
        if (
            !req.body.id ||
            !req.body.topic ||
            typeof req.body.total !== "number" ||
            typeof req.body.cards !== "object"
        ) {
            return res.status(400).json({
                errors: ["Request body not complete or invalid data supplied"],
            });
        }

        let result;
        try {
            await client.connect();
            result = await client
                .db("plearncard")
                .collection("cards")
                .findOneAndUpdate(
                    { userId, _id: ObjectId(setId) },
                    {
                        $set: {
                            name: req.body.topic,
                            description: req.body.description || "",
                            total: req.body.total,
                            cards: req.body.cards,
                        },
                    }
                );
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(200).json(result.value);
    } else if (req.method === "PATCH") {
        // Toggle favourite
        if (typeof req.body.isFavourite !== "boolean") {
            return res.status(400).json({
                errors: ["Request body not complete"],
            });
        }

        let result;
        try {
            await client.connect();
            result = await client
                .db("plearncard")
                .collection("cards")
                .findOneAndUpdate(
                    { userId, _id: ObjectId(setId) },
                    {
                        $set: {
                            isFavourite: req.body.isFavourite,
                        },
                    },
                    { returnOriginal: false }
                );
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(200).json(result.value);
    } else if (req.method === "DELETE") {
        if (!req.query.id) {
            return res
                .status(400)
                .json({ errors: ["Request body not complete"] });
        }

        try {
            await client.connect();
            await client
                .db("plearncard")
                .collection("cards")
                .deleteOne({ userId, _id: ObjectId(setId) });
        } catch {
            return res
                .status(500)
                .json({ errors: ["Database connection failed"] });
        } finally {
            await client.close();
        }

        return res.status(200).json({ message: "Deleted" });
    }

    return res.status(405).json({ errors: ["Method not allowed"] });
};
