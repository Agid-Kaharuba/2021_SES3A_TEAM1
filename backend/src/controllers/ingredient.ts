import { Request, Response } from 'express';
// import { MongoError } from 'mongodb';
import Ingredient from '../model/ingredient';
import ResponseService from '../helpers/response';

export default class IngredientController {
  // Get all Ingredients
  public async getAll(req: Request, res: Response) {
    try {
      const ingredients = await Ingredient.find({ archive: { $ne: true } });
      ResponseService.successResponse(res, ingredients);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  // Create an ingredient
  public async create(req: Request, res: Response) {
    const { body } = req;
    const newIngredientRequest = new Ingredient({
      name: body.name,
      id: body.id,
      archive: body.archive,
    } as any);
    newIngredientRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newIngredientRequest);
      }
    });
  }

  // Search ingredient by id
  public async search(req: Request, res: Response) {
    try {
      const ingredient = await Ingredient.find({ id: req.query.id });
      ResponseService.successResponse(res, ingredient);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }
  // //Update an ingredient
  // public async update(req: Request, res: Response) {
  //     try {
  //         const id = req.params.id;
  //         req.body.ingredient = undefined;
  //         const body = req.body;
  //         const response = await Ingredient.updateOne({ _id: id }, body, { omitUndefined: true });
  //         ResponseService.successResponse(res, response);
  //     }
  //     catch (err) {
  //         ResponseService.mongoNotFoundResponse(res, err);
  //     }
  // }

  // //Delete a task
  // public async delete(req: Request, res: Response) {
  //     try {
  //         const id = req.params.taskId;
  //         const response = await Task.updateOne({ _id: id }, { archive: true });
  //         res.json(response);
  //     }
  //     catch (err) {
  //         ResponseService.mongoNotFoundResponse(res, err);
  //     }
  // }
}
