import { addArtist,listArtist, removeArtist } from "../controllers/artistController.js";
import express from 'express';
import upload from "../middleware/multer.js";

const artistRouter = express.Router();

artistRouter.post('/add',upload.single('image'),addArtist);
artistRouter.get('/list',listArtist);
artistRouter.post('/remove', removeArtist);

export default artistRouter;