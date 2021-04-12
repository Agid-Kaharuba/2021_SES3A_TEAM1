import { Express } from "express";
import StepController from "../controllers/step";

export const StepRoute = (app: Express, controller: StepController) => {

    /**
     * @swagger
     * /step:
     *  get:
     *   description: Get all steps
     *   tags: [Step]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/step", controller.getAll);

    /**
     * @swagger
     * /step/create:
     *  post:
     *   description: Create a step
     *   tags: [Step]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: First Step
     *        description:
     *         type: string
     *         example: Boil water
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/step/create", controller.create);

    /**
     * @swagger
     * /step/{stepId}:
     *  get:
     *   description: Get all steps by name
     *   tags: [Step]
     *   parameters:
     *    - in: path
     *      name: stepId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/step/:stepId", controller.get);

    /**
     * @swagger
     * /step/{stepId}:
     *  put:
     *   description: Update a step by id
     *   tags: [Step]
     *   parameters:
     *    - in: path
     *      name: stepId
     *      required: true
     *      type: string
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: First Step
     *        description:
     *         type: string
     *         example: Boil water
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/step/:stepId", controller.update);

    /**
     * @swagger
     * /step/{stepId}:
     *  delete:
     *   description: Delete a step
     *   tags: [Step]
     *   parameters:
     *    - in: path
     *      name: stepId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.delete("/step/:stepId", controller.delete);
}