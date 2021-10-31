import { Express } from 'express';
import FloorController from '../controllers/floor';

export const FloorRoute = (app: Express, controller: FloorController) => {
  /**
      * @swagger
      * /floor:
      *  get:
      *   description: Get the floorplan
      *   tags: [Floor]
      *   responses:
      *    200:
      *     description: Success
      */
  app.get('/floor', controller.getTheFloorPlan);

  /**
      * @swagger
      * /floor:
      *  put:
      *   description: Update the floor plan
      *   tags: [Floor]
      *   requestBody:
      *    required: true,
      *    content:
      *     application/json:
      *      schema:
      *       type: object
      *       properties:
      *        coordinate:
      *         type: object
      *         example: data
      *   responses:
      *    200:
      *     description: Success
      */
  app.put('/floor', controller.updateTheFloodplan);
};
