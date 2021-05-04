import { Express } from "express";
import ProgressController from "../controllers/progress";
import { checkToken } from "../middleware/auth";

export const ProgressRoute = (app: Express, controller: ProgressController) => {
    /**
     * @swagger
     * /progress:
     *  put:
     *   description: Create or Updates a progress
     *   tags: [Progress]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        data:
     *         type: Object
     *         example: {"data": "data"}
     *        userId:
     *         type: string
     *         example: John
     *        taskId: 
     *         type: string
     *         example: Task
     *        courseId: 
     *         type: string
     *         example: Course
     *        completed:
     *         type: Boolean
     *         example: True
     *        score:
     *         type: Number
     *         example: 22
     *       
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/progress", controller.put);
}
