import { Express } from "express";
import RecipeController from "../controllers/recipe";

export const RecipeRoute = (app: Express, controller: RecipeController) => {
    //Get all recipes in a course (E.g. All milk tea recipes)
    app.get("/course/:courseId", controller.getAll);

    //Get a recipe by id
    //app.get("/course/:courseId/:recipeId", controller.get);
    
    
    
    
    
    
    
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
    //app.get("/course", controller.getAll);
    /**
     * @swagger
     * /course/{courseId}:
     *  get:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    //app.get("/course/:courseId", controller.get);
    /**
     * @swagger
     * /course:
     *  post:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: description
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    //app.post("/course", controller.create);
    /**
     * @swagger
     * /course/{courseId}:
     *  put:
     *   description: Update a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *    - in: formData
     *      name: name
     *      required: true
     *      type: string
     *    - in: formData
     *      name: description
     *      required: false
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    //app.put("/course/:courseId", controller.update);
    /**
     * @swagger
     * /course/{courseId}:
     *  delete:
     *   description: Get a course by id
     *   tags: [Course]
     *   parameters:
     *    - in: path
     *      name: courseId
     *      required: true
     *      type: string
     *   responses:
     *    200:
     *     description: Success
     */
    //app.delete("/course/:courseId", controller.delete);
}