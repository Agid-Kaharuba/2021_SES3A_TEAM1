import { Request, Response } from "express";
import Recipe from "../model/recipe";

export default class RecipeController {

    //Get all existing recipes
    public async getAll(req: Request, res: Response) {
        const recipes = await Recipe.find({ archive: { $ne: true } });
        res.json(recipes)
    }

    //Get recipe by id
    public async getById(req: Request, res: Response) {
        const recipe = await Recipe.findOne({
            _id: req.params.recipeId,
            archive: { $ne: true }
        });
        res.json(recipe);
    }
    
    //Get all recipes in a category
    public async getAllByCategory(req: Request, res: Response) {
        const recipe = await Recipe.find({
            category: req.body.category
        });
        res.json(recipe);
    }

    //Create a recipe 
    public async create(req: Request, res: Response) {
        const body = req.body;
        const newRecipeRequest = new Recipe({
            name: body.name,
            steps: body.steps,
            ingredients: body.ingredients,
            category: body.category
        } as any);
        newRecipeRequest.save();
        res.json(newRecipeRequest);
    }

    //Update a recipe
    public async update(req: Request, res: Response){
        const id = req.params.recipeId;
        const body = req.body;
        const response = await Recipe.updateOne({_id: id}, body);
        res.json(response);
    }

    // public async getAll(req: Request, res: Response) {
    //     const courses = await Course.find({ archive: { $ne: true } });
    //     res.json(courses)
    // }

    // public async get(req: Request, res: Response) {
    //     const course = await Course.findOne({
    // 		_id: req.params.courseId
    // 	});
    //     res.json(course)
    // }

    // public async create(req: Request, res: Response) {
    // 	const body = req.body;
    // 	const newCourseRequest = new Course({
    // 		name: body.name,
    // 		description: body.description
    // 	} as any);
    // 	newCourseRequest.save();
    //     res.json(newCourseRequest);
    // }

    // public async update(req: Request, res: Response) {
    //     const id = req.params.courseId;
    // 	const body = req.body;
    //     const response = await Course.update({ _id: id }, body);
    //     res.json(response);
    // }

    // public async delete(req: Request, res: Response) {
    //     const id = req.params.courseId;
    //     const response = await Course.update({ _id: id }, { archive: true });
    //     res.json(response);
    // }
}