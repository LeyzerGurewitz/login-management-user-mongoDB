// teacherController.ts
import { Request, Response } from "express";
import {addGrade, getStudentAverage, getAllStudents, deleteStudent, deleteGrade, getAllGradesForStudent} from "../services/teacherService.js";
import UserModel from "../models/UserModel.js";

export const addGradeToStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { passportId, subject, grade } = req.body;

    if (!passportId || !subject || !grade) {
      res.status(400).json({ error: "Missing student ID, subject or grade." });
      return;
    }

    await addGrade(passportId, { subject, grade });
    res.status(200).json({ message: "Grade added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add grade." });
  }
};

export const getAverageGradeForStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const {passportId} = req.body;

    const average = await getStudentAverage(passportId);

    if (average === null) {
      res.status(404).json({ error: "Student not found or has no grades." });
      return;
    }

    res.status(200).json({ average });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve student's average." });
  }
};


export const removeStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { passportId } = req.body;

    await deleteStudent(passportId);
    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student." });
  }
};

export const fetchAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students." });
  }
};


export const removeStudentGrade = async (req: Request, res: Response): Promise<void> => {
    try {
      const { passportId, subject } = req.body;
  
      if (!passportId || !subject) {
        res.status(400).json({ error: "Missing student ID or subject." });
        return;
      }
  
      await deleteGrade(passportId, subject);
      res.status(200).json({ message: "Grade deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete grade." });
    }
  };


  export const getStudentGrades = async (req: Request, res: Response): Promise<void> => {
    try {
      const { passportId } = req.body;
  
      const grades = await getAllGradesForStudent(passportId);
  
      res.status(200).json({ grades });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve student's grades." });
    }
  };

