import { Express } from "express";
import AuthController from "../controllers/auth";

export const AuthRoute = (app: Express, controller: AuthController) => {
    /**
     * @swagger
     * /auth/register:
     *  post:
     *   description: Register a new user
     *   tags: [Auth]
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
    app.post('/auth/register', controller.create);
    /**
     * @swagger
     * /auth/login:
     *  post:
     *   description: Login
     *   tags: [Auth]
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
    app.post('/auth/login', controller.login);
}