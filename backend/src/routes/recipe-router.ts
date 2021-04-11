import { Express } from "express";
import RecipeController from "../controllers/recipe";

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
    app.get("/recipe", controller.getAll);

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
    app.get("/recipe/:recipeId", controller.getById);

    /**
     * @swagger
     * /recipe/category:
     *  post:
     *   description: Get recipes by category
     *   tags: [Recipe]
     *   parameters:
     *    - in: formData
     *      name: category
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/recipe/category", controller.getAllByCategory);

    /**
     * @swagger
     * /recipe/create:
     *  post:
     *   description: Create a recipe
     *   tags: [Recipe]
     *   parameters:
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: steps
     *      required: false
     *      type: Object
     *    - in: formData
     *      name: category
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.post("/recipe/create", controller.create);

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
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: steps
     *      required: false
     *      type: Object
     *    - in: formData
     *      name: category
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    app.put("/recipe/:recipeId", controller.update);

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
    app.delete("/recipe/:recipeId", controller.delete);
}