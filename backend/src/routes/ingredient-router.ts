import { Express } from "express";
import IngredientController from "../controllers/ingredient";

export const IngredientRoute = (app: Express, controller: IngredientController) => {

    /**
     * @swagger
     * /task:
     *  get:
     *   description: Get all ingredients
     *   tags: [Ingredient]
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/ingredient", controller.getAll);

    /**
     * @swagger
     * /task:
     *  post:
     *   description: Create an ingredient
     *   tags: [Task]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: Tomato
     *        id:
     *         type: string
     *         example: VEG1
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/ingredient", controller.create);

    /**
     * @swagger
     * /task/{taskId}:
     *  get:
     *   description: Get all tasks by name
     *   tags: [Task]
     *   parameters:
     *    - in: path
     *      name: id
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.get("/task/:taskId", controller.get);

    /**
     * @swagger
     * /ingredient/{ingredientId}:
     *  put:
     *   description: Update a ingredient by ingredientId
     *   tags: [Ingredient]
     *   parameters:
     *    - in: path
     *      name: ingredientId
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
     *         example: Tomato
     *        id:
     *         type: string
     *         example: VEG1
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/task/:taskId", controller.update);
}