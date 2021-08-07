import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import Recipe from '../model/recipe';
import ResponseService from '../helpers/response';

export async function findRecipe(Id: string) {
  return await Recipe.findOne({
    _id: Id,
  });
}

export default class RecipeController {
  // Get all existing recipes
  public async getAll(req: Request, res: Response) {
    try {
      const recipes = await Recipe.find({ archive: { $ne: true } });
      ResponseService.successResponse(res, recipes);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  // Get recipe by id
  public async getById(req: Request, res: Response) {
    try {
      const recipe = await findRecipe(req.params.recipeId);
      ResponseService.successResponse(res, recipe);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Get all recipes in a category
  public async getAllByCategory(req: Request, res: Response) {
    try {
      const recipe = await Recipe.find({
        category: req.query.category,
      });
      ResponseService.successResponse(res, recipe);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  // Create a recipe
  public async create(req: Request, res: Response) {
    const { body } = req;
    const newRecipeRequest = new Recipe({
      name: body.name,
      steps: body.steps,
      ingredients: body.ingredients,
      category: body.category,
    } as any);
    newRecipeRequest.save((err: MongoError) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newRecipeRequest);
      }
    });
  }

  // Update a recipe
  public async update(req: Request, res: Response) {
    try {
      const id = req.params.recipeId;
      const { body } = req;
      const response = await Recipe.updateOne({ _id: id }, body);
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Delete a recipe
  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.recipeId;
      const response = await Recipe.updateOne({ _id: id }, { archive: true });
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }
}
