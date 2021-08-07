import { Response } from 'express';
import { MongoError } from 'mongodb';

export default {
  // TODO set data to data?: any
  // have removed for now as too many frustrating errors not being caught
  // (data is being used as the response in some locations)
  successResponse: (res: Response, data: any) => {
    res
      .status(200)
      .json(data);
  },
  errorResponse: (res: Response, err: Error, msg?: string) => {
    res
      .status(500)
      .send({ msg, err });
  },
  notFoundResponse: (res: Response, msg?: string) => {
    res
      .status(500)
      .send({ msg });
  },
  unauthorizedResponse: (res: Response, msg?: string) => {
    res
      .status(401)
      .send({ msg });
  },
  mongoErrorResponse: (res: Response, err: MongoError, data?: any) => {
    switch (err.code) {
      case 11000: // Duplicate key
        res.status(400).send({ msg: 'Duplicate key', err, data });
        break;
      default:
        res.status(500).send({ msg: 'MongoDB Error', err, data });
        break;
    }
  },
  mongoNotFoundResponse: (res: Response, err: MongoError | string, data?: any) => {
    res
      .status(404)
      .send({ msg: 'Not Found', err, data });
  },
};
