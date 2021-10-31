import { Request, Response } from 'express';
import ResponseService from '../helpers/response';
//import { spawn } from 'child_process';
import axios from 'axios';
import config from "../helpers/config"

export default class InferenceController {
  public async getInference(req: Request, res: Response) {
    try {
      // const { body } = req;
      // const text = body.text;
      // let dataToSend: any;
      // console.log(text)
      // //await spawn('python', [`../tacotron2/inference.py -s ${text}`])
      // const { spawn } = require('child_process');
      // const python = await spawn('python', ['src/tacotron2/inference.py']);
      // // collect data from script
      // await python.stdout.on('data', function (data: any) {
      //   console.log('Pipe data from python script ...');
      //   dataToSend = data.toString();
      //   console.log(dataToSend)
      //   //res.write(data)
      //   //res.end('end')
      //   //console.log(res)
      // });

      // python.on('close', (code: any) => {
      //   console.log(`child process close all stdio with code ${code}`);
      //   res.send(dataToSend)
      //   });
      ResponseService.successResponse(res, "yo yo yo it worked");
    }
    catch (err: any) {
      ResponseService.errorResponse(res, err, "bruh");
    }
  }

  public async proxy(req: Request, res: Response) {
    try {
      const { body } = req;
      const text = body.text;

      const axiosResponse = await axios.post(
        config.TEXT_TO_SPEECH_API,
        new URLSearchParams({
          message: text
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType: 'stream'
        }
      )

      console.log(axiosResponse.headers);
      Object.entries(axiosResponse.headers).map(
        ([name, value]) => res.setHeader(name, value)
      );
      axiosResponse.data.pipe(res)
    }
    catch (err: any) {
      console.log(err);
      ResponseService.errorResponse(res, err, "Error");
    }
  }
}