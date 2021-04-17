import { Request, Response } from "express";
import { MongoError } from "mongodb";
import ProfileImage from "../model/image";
import ResponseService from "../helpers/response";


export default class ImageController{
  public uploadProfileImage(req: Request, res: Response){
    console.log(req.file)
    const name = req.file.originalname;
    const mimetype = req.file.mimetype;
    const img = req.file.buffer;
    
    console.log(mimetype)

    if (!checkMime(mimetype)){
      // Add response
      res
      .status(500)
      .send("Error: Wrong file type");
      return;
    }

    const newImageRequest = new ProfileImage({
      name,
      img
    } as any);
    
    newImageRequest.save((err: MongoError) => {
      if (err) {
				ResponseService.mongoErrorResponse(res, err);
			} else {
				ResponseService.successResponse(res, "congratz");
			}
    });
  }
}

function checkMime(mime: String) {
  if (mime === "image/jpeg" ||
      mime === "image/bmp" ||
      mime === "image/png" ||
      mime === "image/tiff" ||
      mime === "image/webp") {
    return true;
  }
  else{
    return false;
  }
}