import UserModel, { IUser, ERole,IGrade } from "../models/UserModel.js";
import { verifyToken } from "../utils/jwtUtils.js";



export const getAverageGrades = async (userId: string): Promise<number> => {
  try {
    // ביצוע שאילתת אגרגציה לחישוב ממוצע הציונים
    const result = await UserModel.aggregate([
      { $match: { _id: userId } }, // התאמה למשתמש לפי מזהה
      { $unwind: "$grades" }, // פתיחה של מערך הציונים לשורות נפרדות
      {
        $group: {
          _id: "$_id",
          averageGrade: { $avg: "$grades.grade" }, // חישוב ממוצע
        },
      },
    ]);

    // בדיקה אם נמצאו תוצאות
    if (!result || result.length === 0) {
      throw new Error("No grades found for this student");
    }

    return result[0].averageGrade; // מחזיר את ממוצע הציונים
  } catch (error) {
    console.error(error);
    throw new Error("Failed to calculate average grades");
  }
};

  
  export const getAllGrades = async (userId: string): Promise<IGrade[]> => {
    try {
      // שליפת המשתמש מהמסד הנתונים לפי ה-id
      const user = await UserModel.findById(userId).select("grades");
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // החזרת הציונים של המשתמש
      return user.grades;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve grades");
    }
  };