var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// studentService.ts
import UserModel from "../models/UserModel.js";
export const addGrade = (passportId, grade) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel.findOneAndUpdate({ passportId }, {
        $push: { grades: grade } // מוסיף את הציון החדש למערך הציונים
    });
});
export const getStudentAverage = (passportId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield UserModel.findOne({ passportId }).select("grades");
    if (!student || student.grades.length === 0) {
        return null;
    }
    const total = student.grades.reduce((acc, grade) => acc + grade.grade, 0);
    const average = total / student.grades.length;
    return average;
});
export const deleteStudent = (passportId) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel.findOneAndDelete({ passportId });
});
export const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserModel.find({ role: "student" }).select("fullName passportId grades");
});
export const deleteGrade = (passportId, subject) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel.findOneAndUpdate({ passportId }, { $pull: { grades: { subject } } }, // מסיר ציון לפי נושא
    { new: true });
});
export const getAllGradesForStudent = (passportId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield UserModel.findOne({ passportId }).select("grades");
    if (!student) {
        throw new Error("Student not found");
    }
    return student.grades;
});
