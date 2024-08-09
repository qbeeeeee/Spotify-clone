import { signUp,logIn } from '../controllers/userController.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', logIn)

export default userRouter;