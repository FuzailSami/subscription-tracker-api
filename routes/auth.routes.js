import {Router} from 'express';
import {signUp} from "../controllers/auth.controllers.js";
import {signIn} from "../controllers/auth.controllers.js";
import {signOut} from "../controllers/auth.controllers.js";
const authRouter = Router();

authRouter.post('/signup',signUp);
authRouter.post('/sign-in',signIn);
authRouter.post('/sign-out',signOut);



export default authRouter;
