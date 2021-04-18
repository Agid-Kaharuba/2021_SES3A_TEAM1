import { Express } from "express";
import UserController from "../controllers/user";
import { checkToken } from "../middleware/auth";

export const UserRoute = (app: Express, controller: UserController) => {
    /**
     * @swagger
     * /user/all:
     *  get:
     *   description: Get all the users
     *   tags: [User]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/user/all", controller.getAll);
    /**
     * @swagger
     * /user:
     *  get:
     *   description: Get current user
     *   tags: [User]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/user", checkToken, controller.get);
    /**
     * @swagger
     * /user/{userId}:
     *  get:
     *   description: Get a user by id
     *   tags: [User]
     *   parameters:
     *    - in: path
     *      name: userId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/user/:userId", controller.get);
}
