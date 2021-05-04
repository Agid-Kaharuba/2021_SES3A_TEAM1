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

    /**
     * @swagger
     * /progress?task={taskId}&user={userId}&course={courseId}:
     *  put:
     *   description: Get a progress by userId, taskId, courseId or all of them
     *   tags: [Progress]
     *   parameters:
     *    - in: path
     *      name: userId
     *      required: false
     *      type: string
     *    - in: path
     *      name: taskId
     *      required: false
     *      type: string
     *    - in: path
     *      name: courseId
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/progress?task={taskId}&user={userId}&course={courseId}", controller.searchProgress);
}
