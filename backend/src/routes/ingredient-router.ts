import { Express } from 'express';
import IngredientController from '../controllers/ingredient';

export const IngredientRoute = (app: Express, controller: IngredientController) => {
  /**
     * @swagger
     * /ingredient:
     *  get:
     *   description: Get all ingredients
     *   tags: [Ingredient]
     *   responses:
     *    200:
     *     description: Success
     */
  app.get('/ingredient', controller.getAll);

  /**
     * @swagger
     * /ingredient:
     *  post:
     *   description: Create an ingredient
     *   tags: [Ingredient]
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
  app.post('/ingredient', controller.create);

  /**
     * @swagger
     * /ingredient/search:
     *  get:
     *   description: Get an ingredient by id
     *   tags: [Ingredient]
     *   parameters:
     *    - in: query
     *      name: id
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
  app.get('/ingredient/search', controller.search);
};
