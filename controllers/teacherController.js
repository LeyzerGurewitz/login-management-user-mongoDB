var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addGrade, getStudentAverage, getAllStudents, deleteStudent, deleteGrade, getAllGradesForStudent } from "../services/teacherService.js";
export const addGradeToStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passportId, subject, grade } = req.body;
        if (!passportId || !subject || !grade) {
            res.status(400).json({ error: "Missing student ID, subject or grade." });
            return;
        }
        yield addGrade(passportId, { subject, grade });
        res.status(200).json({ message: "Grade added successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add grade." });
    }
});
export const getAverageGradeForStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passportId } = req.body;
        const average = yield getStudentAverage(passportId);
        if (average === null) {
            res.status(404).json({ error: "Student not found or has no grades." });
            return;
        }
        res.status(200).json({ average });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve student's average." });
    }
});
export const removeStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passportId } = req.body;
        yield deleteStudent(passportId);
        res.status(200).json({ message: "Student deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete student." });
    }
});
export const fetchAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield getAllStudents();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve students." });
    }
});
export const removeStudentGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passportId, subject } = req.body;
        if (!passportId || !subject) {
            res.status(400).json({ error: "Missing student ID or subject." });
            return;
        }
        yield deleteGrade(passportId, subject);
        res.status(200).json({ message: "Grade deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete grade." });
    }
});
export const getStudentGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passportId } = req.body;
        const grades = yield getAllGradesForStudent(passportId);
        res.status(200).json({ grades });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve student's grades." });
    }
});
