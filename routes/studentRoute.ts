import express, {Router} from 'express';
import {getStudentAverage, getStudentGrades} from "../controllers/studentController.js"
import {checkStudentRole} from "../Middleware/studentMiddleware.js"

const router: Router = express.Router();
router.use(checkStudentRole)

/** 
 * @swagger
 * //student:
 *     get:
 *      summary:
 *      responses:
 *          200:
 *              description: A json user
 */ 
router.route('/average').get(getStudentAverage);
/** 
 * @swagger
 * //student:
 *     get:
 *      summary:
 *      responses:
 *          200:
 *              description: A json user
 */ 
router.route('/grades').get(getStudentGrades);
export default router;