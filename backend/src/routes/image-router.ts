import { Express } from "express";
import multer from "multer";
import ImageController from "../controllers/image";

export const ImageRoute = (app: Express, controller: ImageController) => {
  const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 16 * 1024 * 1024, // keep images size < 16 MB
    },
  });

  app.post("/upload", )
}