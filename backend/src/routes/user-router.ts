import { Express } from "express";
import UserController from "../controllers/user";

export const UserRoute = (app: Express, controller: UserController) => {
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
    app.get("/user", controller.getAll);
}
