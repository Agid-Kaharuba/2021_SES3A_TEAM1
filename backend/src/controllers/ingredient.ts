import { Request, Response } from "express";
import Ingredient from "../model/ingredient";
import ResponseService from "../helpers/response"
import { MongoError } from "mongodb";

export default class IngredientController {
    //Get all Ingredients
    public async getAll(req: Request, res: Response) {
        try {
            const ingredients = await Ingredient.find({ archive: { $ne: true } });
            ResponseService.successResponse(res, ingredients);
        }
        catch (err) {
            ResponseService.mongoErrorResponse(res, err);
        }
    }

    //Create a task
    public async create(req: Request, res: Response) {
        const body = req.body;
        const newIngredientRequest = new Ingredient({
            name: body.name,
            id: body.id,
            archive: body.archive
        } as any);
        newIngredientRequest.save((err: MongoError) => {
            if (err) {
                ResponseService.mongoErrorResponse(res, err);
            } else {
                ResponseService.successResponse(res, newIngredientRequest);
            }
        });
    }

    public async search(req: Request, res: Response) {
        var ingredient = await Ingredient.findOne({ id: req.params.id });
        ResponseService.successResponse(res, ingredient);
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