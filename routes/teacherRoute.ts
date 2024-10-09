import express, {Router} from 'express';
import {addGradeToStudent,  getAverageGradeForStudent,removeStudent ,fetchAllStudents, getStudentGrades, removeStudentGrade} from "../controllers/teacherController.js";
import {checkTeacherRole } from "../Middleware/teacherMiddleware.js";

const router: Router = express.Router();
router.use(checkTeacherRole)

router.route('/grades').get(getStudentGrades)
router.route('/addGrade').post(addGradeToStudent)
router.route('/avgGrade').get( getAverageGradeForStudent)
router.route('/deleteStudent').delete(removeStudent)
router.route('/getAllStudent').get(fetchAllStudents)
router.route('/deleteGrade').delete(removeStudentGrade)

export default router;