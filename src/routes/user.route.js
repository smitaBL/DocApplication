import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginDetailvalidator } from '../validators/user.validator';


const router = express.Router();


//route to create a new user
router.post('', newUserValidator, userController.registerNewUser);

//route to create a new user
router.post('/login', loginDetailvalidator, userController.userLogin);



export default router;
