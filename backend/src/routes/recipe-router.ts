import { Express } from 'express';
import RecipeController from '../controllers/recipe';

export const RecipeRoute = (app: Express, controller: RecipeController) => {
  /**
     * @swagger
     * /recipe:
     *  get:
     *   description: Get all the recipes
     *   tags: [Recipe]
     *   responses:
     *    200:
     *     description: Success
     */
  app.get('/recipe', controller.getAll);

  /**
     * @swagger
     * /recipe/search:
     *  get:
     *   description: Get recipes by category
     *   tags: [Recipe]
     *   parameters:
     *    - in: query
     *      name: category
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
  app.get('/recipe/search', controller.getAllByCategory);

  /**
     * @swagger
     * /recipe/{recipeId}:
     *  get:
     *   description: Get a recipe by id
     *   tags: [Recipe]
     *   parameters:
     *    - in: path
     *      name: recipeId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
  app.get('/recipe/:recipeId', controller.getById);

  /**
     * @swagger
     * /recipe:
     *  post:
     *   description: Create a recipe
     *   tags: [Recipe]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        name:
     *         type: string
     *         example: Whooper
     *        steps:
     *         type: array
     *         items:
     *          type: object
     *          example: ["1) Put bottom bun on plate"]
     *         example: ["1) Put bottom bun on plate", "2) Insert beef patty", "3) Place lettuce on top", "4) Put on top bun"]
     *        ingredients:
     *         type: array
     *         items:
     *          type: string
     *          example: "top_bun"
     *         example: ["top_bun", "cheese", "patty", "bottom_bun"]
     *        category:
     *         type: string
     *         example: Cheeseburger
     *   responses:
     *    200:
     *     description: Success
     */
  app.post('/recipe', controller.create);
  app.put('/recipe', controller.create);

  /**
     * @swagger
     * /recipe/{recipeId}:
     *  put:
     *   description: Update a recipe by id
     *   tags: [Recipe]
     *   parameters:
     *    - in: path
     *      name: recipeId
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
     *         example: Whooper
     *        steps:
     *         type: array
     *         items:
     *          type: object
     *          example: ["1) Put bottom bun on plate"]
     *         example: ["1) Put bottom bun on plate", "2) Insert beef patty", "3) Place lettuce on top", "4) Put on top bun"]
     *        ingredients:
     *         type: array
     *         items:
     *          type: string
     *          example: "top_bun"
     *         example: ["top_bun", "cheese", "patty", "bottom_bun"]
     *        category:
     *         type: string
     *         example: Cheeseburger
     *   responses:
     *    200:
     *     description: Success
     */
  app.put('/recipe/:recipeId', controller.update);

  /**
     * @swagger
     * /recipe/{recipeId}:
     *  delete:
     *   description: Delete a recipe
     *   tags: [Recipe]
     *   parameters:
     *    - in: path
     *      name: recipeId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
  app.delete('/recipe/:recipeId', controller.delete);
};
