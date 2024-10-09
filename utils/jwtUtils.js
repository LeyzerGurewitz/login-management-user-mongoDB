import jwt from "jsonwebtoken";
// מפתח סודי ל-JWT (עדיף לשמור במשתנה סביבה)
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
// פונקציה ליצירת JWT
export const createToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
// פונקציה לאימות JWT
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
