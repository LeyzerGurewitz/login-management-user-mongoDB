import { Request, Response } from "express";
import { getAverageGrades, getAllGrades } from "../services/studentService.js";


interface AuthenticatedRequest extends Request {
    userId?: string;
  }

  
  
  export const getStudentAverage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // שליפת ה-userId מתוך ה-request
      const userId = req.userId; // נניח שה-userId נוסף ב-midware
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
  
      const average = await getAverageGrades(userId); // שליחה ל-service
      res.status(200).json({ average });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to calculate average grades" });
    }
  };
  

export const getStudentGrades = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // שליפת ה-id מה-request
      const userId = req.userId;
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
  
      // קריאה לפונקציה ב-service עם ה-id של המשתמש
      const grades = await getAllGrades(userId);
  
      res.status(200).json({ grades });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve grades" });
    }
  };