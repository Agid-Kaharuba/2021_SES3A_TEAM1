import { Express } from 'express';
import FloorController from '../controllers/floor';

export const FloorRoute = (app: Express, controller: FloorController) => {
   /**
      * @swagger
      * /floor:
      *  get:
      *   description: Get all floors
      *   tags: [Floor]
      *   responses:
      *    200:
      *     description: Success
      */
   app.get('/floor', controller.getAll);

   /**
      * @swagger
      * /floor:
      *  post:
      *   description: Create a floor
      *   tags: [Floor]
      *   requestBody:
      *    required: true,
      *    content:
      *     application/json:
      *      schema:
      *       type: object
      *       properties:
      *        name:
      *         type: string
      *         example: First Floor
      *        data:
      *         type: object
      *         example: data
      *   responses:
      *    200:
      *     description: Success
      */
   app.post('/floor', controller.create);
   app.put('/floor', controller.create);

   /**
      * @swagger
      * /floor/{floorId}:
      *  get:
      *   description: Get a floor by id
      *   tags: [Floor]
      *   parameters:
      *    - in: path
      *      name: floorId
      *      required: true
      *      type: string
      *   responses:
      *    200:
      *     description: Success
      */
   app.get('/floor/:floorId', controller.getById);

   /**
      * @swagger
      * /floor/{floorId}:
      *  put:
      *   description: Update a floor by id
      *   tags: [Floor]
      *   parameters:
      *    - in: path
      *      name: floorId
      *      required: true
      *      type: string
      *   requestBody:
      *    required: true,
      *    content:
      *     application/json:
      *      schema:
      *       type: object
      *       properties:
      *        name:
      *         type: string
      *         example: First Floor
      *        data:
      *         type: object
      *         example: data
      *   responses:
      *    200:
      *     description: Success
      */
   app.put('/floor/:floorId', controller.update);

   /**
      * @swagger
      * /floor/{floorId}:
      *  delete:
      *   description: Delete a floor
      *   tags: [Floor]
      *   parameters:
      *    - in: path
      *      name: floorId
      *      required: true
      *      type: string
      *   responses:
      *    200:
      *     description: Success
      */
   app.delete('/floor/:floorId', controller.delete);
};
