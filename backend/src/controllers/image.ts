import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import ProfileImage from '../model/image';
import ResponseService from '../helpers/response';

export default class ImageController {
  public async uploadProfileImage(req: Request, res: Response) {
    const originalName = req.file.originalname;
    const { mimetype } = req.file;
    const img = req.file.buffer;
    // const name = originalName.substring(0, originalName.lastIndexOf('.'));
    const name = req.file.originalname;
    let delet = false;

    if (!checkMime(mimetype)) {
      // Add response
      res
        .status(500)
        .send('Error: Wrong file type');
      return;
    }

    await ProfileImage.findOne({ name }, async (err: Error, img: typeof ProfileImage) => {
      if (err) {
        throw err;
      }
      if (img) {
        delet = true;
      }
    });

    if (delet) {
      ProfileImage.deleteOne({ name }, undefined, (err) => {
        if (err) {
          throw err;
        }
      });
    }

    const newImageRequest = new ProfileImage({
      name,
      mimetype,
      img,
    } as any);

    newImageRequest.save((err: MongoError) => {
      if (err) {
        ResponseService.mongoErrorResponse(res, err);
      } else {
        ResponseService.successResponse(res, `${originalName} uploaded!`); // Don't put the model as the message or swagger will crash
      }
    });
  }

  public downloadProfileImage(req: Request, res: Response) {
    const name = req.params.username;

    ProfileImage.findOne({ name }, (err: Error, image: typeof ProfileImage) => {
      if (image) {
        const fileType = (image as any).mimetype;
        const conversion = ((image as any).img).toString('base64');
        res.set('Content-Type', fileType);
        return res.status(200).send(`data:${fileType};base64,${conversion}`);
      }
      // ResponseService.mongoNotFoundResponse(res, "File not found");
      return res.status(200).send('https://i.pinimg.com/236x/1f/25/5d/1f255d7f9cf3afe7cd9cd97626d08fbf.jpg');
    });
  }
}

function checkMime(mime: string) {
  if (mime === 'image/jpeg'
    || mime === 'image/bmp'
    || mime === 'image/png'
    || mime === 'image/tiff'
    || mime === 'image/webp') {
    return true;
  }

  return false;
}
