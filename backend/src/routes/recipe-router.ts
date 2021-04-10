import { Express } from "express";
import RecipeController from "../controllers/recipe";

export const RecipeRoute = (app: Express, controller: RecipeController) => {
    //Get all recipes in a course (E.g. All milk tea recipes)
    app.get("/recipe", controller.getAll);

    //Get a recipe by id
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

    
    //Create Recipe
    app.post("/recipe/create", controller.create);

    //Update Recipe
    app.put("/recipe/:recipeId", controller.update);

    //Delete Recipe
    app.delete("/recipe/:recipeId", controller.delete);
}