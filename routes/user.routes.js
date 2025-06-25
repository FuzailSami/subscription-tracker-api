import {Router} from 'express';
import {getUser, getUsers} from "../controllers/user.controllers.js";
import authorize from "../middleware/auth.middleware.js";
import errorMiddleware from "../middleware/error.middleware.js";
const userRouter = Router();


userRouter.get('/',getUsers);

userRouter.get('/:id',authorize,getUser);

userRouter.post('/',(req, res) =>res.send({title:'CREATE new users'}));

userRouter.put('/:id',(req, res) =>res.send({title:'UPDATE user'}));

userRouter.delete('/',(req, res) =>res.send({title:'DELETE user'}));

export default userRouter;
