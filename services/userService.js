var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import UserModel, { ERole } from "../models/UserModel.js"; // ייבוא המודל שלך
export const registerUser = (fullName, password, passportId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserModel({
        fullName: fullName,
        passportId: passportId,
        password: hashedPassword,
        role: role === ERole.teacher ? ERole.teacher : ERole.student, // בדיקת תנאי נכונה
        grades: []
    });
    return yield newUser.save();
});
export const authenticateUser = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    // מציאת המשתמש על פי שם המשתמש
    const userFind = yield UserModel.findOne({ userName: userName });
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    // בדיקת התאמת הסיסמה
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
    if (!passwordMatch) {
        throw new Error("Invalid username or password.");
    }
    return userFind; // החזרת המשתמש שנמצא
});
