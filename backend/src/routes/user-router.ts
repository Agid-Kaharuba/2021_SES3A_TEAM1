import { Express } from "express";
import UserController from "../controllers/user";

export const UserRoute = (app: Express, controller: UserController) => {
    /**
     * @swagger
     * /user/register:
     *  post:
     *   description: Register a new user
     *   tags: [User]
     *   parameters:
     *    - in: formData
     *      name: username
     *      required: true
     *      type: string
     *    - in: formData
     *      name: password
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
  app.post('/user/register', controller.create);
}
