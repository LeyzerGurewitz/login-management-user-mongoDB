var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createToken } from "../utils/jwtUtils.js";
import { registerUser, authenticateUser } from "../services/userService.js";
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, password, passportId, role } = req.body;
        if (!fullName || !password || passportId || role) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const user = yield registerUser(fullName, password, passportId, role);
        res.status(201).json({ user: user });
    }
    catch (error) {
        console.log(error);
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const user = yield authenticateUser(userName, password);
        if (user) {
            // שימוש בפונקציית createToken
            const token = createToken({ _id: user._id, userName: user.fullName, role: user.role }, '1h' // זמן תפוגה של 1 שעה
            );
            // שמירת ה-JWT ב-Cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // אפשר להפעיל רק ב-HTTPS
                sameSite: "strict",
                maxAge: 3600000 // שעה אחת
            });
            // תגובה עם פרטי המשתמש (ללא הסיסמה)
            res.status(200).json({ message: "Login successful", user: { id: user._id, userName: user.fullName, role: user.role } });
        }
        else {
            res.status(401).json({ message: "Authentication failed" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
