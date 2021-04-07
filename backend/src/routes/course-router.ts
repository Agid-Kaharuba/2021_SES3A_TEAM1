import { Express } from "express";
import CourseController from "../controllers/course";

export const CourseRoute = (app: Express, controller: CourseController) => {
    /**
     * @swagger
     * /course:
     *  get:
     *   description: Get all the courses
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/course", controller.getAll);
    /**
     * @swagger
     * /course/{courseId}:
     *  get:
     *   description: Get a course by id
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/course/:courseId", controller.get);
    app.post("/course", controller.create);
}