import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import Task from '../model/task';
import ResponseService from '../helpers/response';

export async function findTask(Id: string) {
  const task = await Task.findOne({
    _id: Id,
  });
  return task;
}

export default class TaskController {
  // Get all tasks
  public async getAll(req: Request, res: Response) {
    try {
      const tasks = await Task.find({ archive: { $ne: true } });
      ResponseService.successResponse(res, tasks);
    } catch (err) {
      ResponseService.mongoErrorResponse(res, err);
    }
  }

  // Get a task by id
  public async get(req: Request, res: Response) {
    try {
      const task = await findTask(req.params.taskId);
      ResponseService.successResponse(res, task);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Create a task
  public async create(req: Request, res: Response) {
    const { body } = req;
    const newTaskRequest = new Task({
      name: body.name,
      description: body.description,
      recipe: body.recipe,
      type: body.type,
    } as any);
    newTaskRequest.save((err: MongoError) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, newTaskRequest);
      }
    });
  }

  // Update a task
  public async update(req: Request, res: Response) {
    try {
      const id = req.params.taskId;
      req.body.recipe = undefined;
      const { body } = req;
      const response = await Task.updateOne({ _id: id }, body, { omitUndefined: true });
      ResponseService.successResponse(res, response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }

  // Delete a task
  public async delete(req: Request, res: Response) {
    try {
      const id = req.params.taskId;
      const response = await Task.updateOne({ _id: id }, { archive: true });
      res.json(response);
    } catch (err) {
      ResponseService.mongoNotFoundResponse(res, err);
    }
  }
}
