import { Request, Response } from "express";
import { MongoError } from "mongodb";
import ProfileImage from "../model/image";
import ResponseService from "../helpers/response";


export default class ImageController{
  public async uploadProfileImage(req: Request, res: Response){
    const name = req.file.filename;
    const file = req.file;
    
    if (!this.checkMime(file.mimetype)){
      // Add response
      res
      .status(500)
      .send("Error: Wrong file type");
      return;
    }

    const newImageRequest = new ProfileImage({
      name,
      file
    } as any);
    
    newImageRequest.save((err: MongoError) => {
      if (err) {
				ResponseService.mongoErrorResponse(res, err);
			} else {
				ResponseService.successResponse(res, newImageRequest);
			}
    });
  }

  private checkMime(mime: String) {
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
}