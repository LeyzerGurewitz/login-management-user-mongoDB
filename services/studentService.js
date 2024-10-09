var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from "../models/UserModel.js";
export const getAverageGrades = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ביצוע שאילתת אגרגציה לחישוב ממוצע הציונים
        const result = yield UserModel.aggregate([
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
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to calculate average grades");
    }
});
export const getAllGrades = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // שליפת המשתמש מהמסד הנתונים לפי ה-id
        const user = yield UserModel.findById(userId).select("grades");
        if (!user) {
            throw new Error("User not found");
        }
        // החזרת הציונים של המשתמש
        return user.grades;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve grades");
    }
});
