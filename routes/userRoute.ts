import express, {Router} from 'express';
import {register, login} from "../controllers/userController.js"
const router: Router = express.Router();
/*
@swagger
 * //register:
 *  post:
 *      summary: create new teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          passportId:
 *                              type: number
 *                          role:
 *                              type: string
 *                          password:
 *                              type: string
 *                          grades:
 *                              type: array
 *      responses:
 *          201:
 *              description: created
 */

router.route('/register').post(register);
router.route('/login').post(login);

export default router;