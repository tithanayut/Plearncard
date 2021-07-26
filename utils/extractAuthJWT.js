import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

const extractJWT = async (req) => {
    let token;
    try {
        token = await jwt.getToken({ req, secret });
    } catch {
        token = null;
    }

    return token;
};

export default extractJWT;
