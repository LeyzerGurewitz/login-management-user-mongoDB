import jwt from "jsonwebtoken";

// מפתח סודי ל-JWT (עדיף לשמור במשתנה סביבה)
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// פונקציה ליצירת JWT
export const createToken = (payload: object, expiresIn: string = "1h"): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// פונקציה לאימות JWT
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
