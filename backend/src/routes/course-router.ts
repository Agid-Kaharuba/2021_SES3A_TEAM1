import { Express } from "express";
import CourseController from "../controllers/course";

export const CourseRoute = (app: Express, controller: CourseController) => {
    /**
     * @swagger
     * /course:
     *  get:
     *   description: Get all the courses
     *   tags: [Course]
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
     *   tags: [Course]
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
    /**
     * @swagger
     * /course:
     *  post:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: description
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/course", controller.create);
    /**
     * @swagger
     * /course/{courseId}:
     *  put:
     *   description: Update a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: description
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/course/:courseId", controller.update);
}