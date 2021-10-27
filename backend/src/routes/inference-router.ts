import { Express } from 'express';
import InferenceController from '../controllers/inference';

export const InferenceRoute = (app: Express, controller: InferenceController) => {
  /**
     * @swagger
     * /inferenceNode:
     *  post:
     *   description: Create a text-to-speech file
     *   tags: [inference]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        text:
     *         type: string
     *         example: This is going to say something!
     *   responses:
     *    200:
     *     description: Success
     */
  app.post('/inferenceWithNode', controller.getInference);

  /**
     * @swagger
     * /inference:
     *  post:
     *   description: Create a text-to-speech file
     *   tags: [inference]
     *   requestBody:
     *    required: true,
     *    content:
     *     application/json:
     *      schema:
     *       type: object
     *       properties:
     *        text:
     *         type: string
     *         example: This is going to say something!
     *   responses:
     *    200:
     *     description: Success
     */
  app.post('/inference', controller.proxy);
}