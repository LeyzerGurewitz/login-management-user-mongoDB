var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAverageGrades, getAllGrades } from "../services/studentService.js";
export const getStudentAverage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // שליפת ה-userId מתוך ה-request
        const userId = req.userId; // נניח שה-userId נוסף ב-midware
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const average = yield getAverageGrades(userId); // שליחה ל-service
        res.status(200).json({ average });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to calculate average grades" });
    }
});
export const getStudentGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // שליפת ה-id מה-request
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        // קריאה לפונקציה ב-service עם ה-id של המשתמש
        const grades = yield getAllGrades(userId);
        res.status(200).json({ grades });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve grades" });
    }
});
