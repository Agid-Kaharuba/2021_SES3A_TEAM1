import { Request, Response } from 'express';
import ResponseService from '../helpers/response';
import { spawn } from 'child_process';

export default class InferenceController {
  public async getInference(req: Request, res: Response) {
    spawn('python', ['../tacotron2/inference.py -s "testing the type script file"'])
  }
}