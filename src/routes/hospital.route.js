import express from 'express';
import * as hospitalController from '../controllers/hosital.controlleer';



const router = express.Router();


//route to create a new user
router.post('', hospitalController.addHospitalDeatils);




export default router;
