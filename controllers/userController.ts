import {createToken} from "../utils/jwtUtils.js";
import {} from "../services/userService.js";
import { Request, Response } from "express";
import {IUser} from "../models/UserModel.js";
import {registerUser, authenticateUser} from "../services/userService.js"

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullName, password, passportId, role }: IUser = req.body;
  
      if (!fullName || !password || passportId || role) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const user = await registerUser(fullName, password, passportId, role);
      res.status(201).json({ user: user });
    } catch (error: any) {
        console.log(error)
    }
  };
  
  export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userName, password } = req.body;
  
      if (!userName || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const user = await authenticateUser(userName, password);
      if (user) {
        // שימוש בפונקציית createToken
        const token = createToken(
          { _id: user._id, userName: user.fullName, role: user.role }, 
          '1h' // זמן תפוגה של 1 שעה
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
    catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    }
  
  