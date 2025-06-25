import {Router} from 'express';
import authorize from "../middleware/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controllers.js";
import {getUser} from "../controllers/user.controllers.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req, res) => res.send({title:'GET all subscriptions'}));

subscriptionRouter.get('/:id',(req, res) => res.send({title:'GET subscription details'}));

subscriptionRouter.post('/',authorize,createSubscription);

subscriptionRouter.put('/',(req, res) => res.send({title:'UPDATE subscriptions'}));

subscriptionRouter.delete('/',(req, res) => res.send({title:'DELETE subscription'}));

subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',(req, res) => res.send({title:'CANCEL subscription'}));

subscriptionRouter.get('/upcoming-renewals',(req, res) => res.send({title:'GET upcoming renewals'}));

export default subscriptionRouter;
