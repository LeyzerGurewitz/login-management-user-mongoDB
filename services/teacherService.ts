// studentService.ts
import UserModel, { IGrade, IUser } from "../models/UserModel.js";


export const addGrade = async (passportId: string, grade: IGrade): Promise<void> => {
  await UserModel.findOneAndUpdate({passportId}, {
    $push: { grades: grade }  // מוסיף את הציון החדש למערך הציונים
  });
};

export const getStudentAverage = async (passportId: string): Promise<number | null> => {
    const student = await UserModel.findOne({passportId}).select("grades");
    if (!student || student.grades.length === 0) {
      return null;
    }
  
    const total = student.grades.reduce((acc, grade) => acc + grade.grade, 0);
    const average = total / student.grades.length;
    return average;
  };

  export const deleteStudent = async (passportId: string): Promise<void> => {
    await UserModel.findOneAndDelete({passportId});
  };
  
  export const getAllStudents = async (): Promise<IUser[]> => {
    return await UserModel.find({ role: "student" }).select("fullName passportId grades");
  };


export const deleteGrade = async (passportId: string, subject: string): Promise<void> => {
  await UserModel.findOneAndUpdate(
    {passportId},
    { $pull: { grades: { subject } } },  // מסיר ציון לפי נושא
    { new: true }
  );
};

export const getAllGradesForStudent = async (passportId: string): Promise<IGrade[]> => {
    const student = await UserModel.findOne({passportId}).select("grades");
    if (!student) {
      throw new Error("Student not found");
    }
    return student.grades;
  };
