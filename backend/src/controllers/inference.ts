import { Request, Response } from 'express';
import ResponseService from '../helpers/response';
//import { spawn } from 'child_process';

export default class InferenceController {
  public async getInference(req: Request, res: Response) {
    try{
      const { body } = req;
      const text = body.text;
      let dataToSend: any;
      console.log(text)
      //await spawn('python', [`../tacotron2/inference.py -s ${text}`])
      const { spawn } = require('child_process');
      const python = await spawn('python', ['src/tacotron2/inference.py']);
      // collect data from script
      await python.stdout.on('data', function (data: any) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend)
        //res.write(data)
        //res.end('end')
        //console.log(res)
      });

      python.on('close', (code: any) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
        });
      ResponseService.successResponse(res, "yo yo yo it worked");
    }
    catch(err: any){
      ResponseService.errorResponse(res, err, "bruh");
    }


  }
}