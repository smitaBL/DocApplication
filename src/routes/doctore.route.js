import express from 'express';
import * as doctorController from '../controllers/doctor.controller';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();


//route to create a new user
router.post('', doctorController.addDoctorDeatils);


//route to create a new user
router.post('/addreview', userAuth, doctorController.addReview);



export default router;
