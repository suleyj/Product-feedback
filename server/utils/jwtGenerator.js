import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./vars/.env" });

export default function jwtGenerator(user) {
    const payload = {
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
