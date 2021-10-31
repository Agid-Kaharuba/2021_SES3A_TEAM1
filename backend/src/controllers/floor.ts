import { Request, Response } from 'express';
// import { MongoError } from 'mongodb';
import Floor from '../model/floor';
import ResponseService from '../helpers/response';

export async function findFloor(Id: string) {
  return Floor.findOne({
    _id: Id,
  });
}

export default class FloorController {
  public async getTheFloorPlan(req: Request, res: Response) {
    try {
      const floor = await Floor.findOne({ archive: { $ne: true } });
      ResponseService.successResponse(res, floor);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  public async updateTheFloodplan(req: Request, res: Response) {
    try {
      const { body } = req;
      const attemptFind = await Floor.findOne({});
      if (attemptFind){
        const response = await Floor.updateOne({}, body);
        ResponseService.successResponse(res, response);
      }
      else {
        const newFloorRequest = new Floor({
          coordinate: body.coordinate,
        } as any);
        newFloorRequest.save((err: any) => {
          if (err) {
            ResponseService.mongoErrorResponse(res, err);
          } else {
            ResponseService.successResponse(res, newFloorRequest);
          }
        });
      }
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Get all floorplans
  public async getAll(req: Request, res: Response) {
    try {
      const floors = await Floor.find({ archive: { $ne: true } });
      ResponseService.successResponse(res, floors);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  // Get Floor by id
  public async getById(req: Request, res: Response) {
    try {
      const floor = await findFloor(req.params.floorId);
      ResponseService.successResponse(res, floor);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Create a Floor
  public async create(req: Request, res: Response) {
    const { body } = req;
    console.log(body);
    const newFloorRequest = new Floor({
      name: body.name,
      coordinate: body.coordinates,
    } as any);
    newFloorRequest.save((err: any) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newFloorRequest);
      }
    });
  }

  // Update a Floor
  public async update(req: Request, res: Response) {
    try {
      const id = req.params.floorId;
      const { body } = req;
      const response = await Floor.updateOne({ _id: id }, body);
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Delete a Floor
  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.floorId;
      const response = await Floor.updateOne({ _id: id }, { archive: true });
      res.json(response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }
}
