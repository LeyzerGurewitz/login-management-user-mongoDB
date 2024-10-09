import bcrypt from "bcrypt";
import UserModel, { IUser, ERole } from "../models/UserModel.js"; // ייבוא המודל שלך


export const registerUser = async (fullName: string, password: string, passportId: number, role: string): Promise<IUser> => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new UserModel({
    fullName: fullName,
    passportId: passportId,
    password: hashedPassword,
    role: role === ERole.teacher ? ERole.teacher : ERole.student, // בדיקת תנאי נכונה
    grades: []
  });

  return await newUser.save();
};


export const authenticateUser = async (userName: string, password: string): Promise<IUser> => {
    // מציאת המשתמש על פי שם המשתמש
    const userFind = await UserModel.findOne({ userName: userName });
  
    if (!userFind) {
      throw new Error("Invalid username or password.");
    }
  
    // בדיקת התאמת הסיסמה
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }
  
    return userFind; // החזרת המשתמש שנמצא
  };


