import { Request, Response } from "express";
import ProfileImage from "../model/image";

export default class ImageController{
  public async uploadProfileImage(req: Request, res: Response){
    if (!this.checkMime(req.file.mimetype)){
      return;
    }

    

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