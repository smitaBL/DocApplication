import express from 'express';
import * as doctorController from '../controllers/doctor.controller';



const router = express.Router();


//route to create a new user
router.post('', doctorController.addDoctorDeatils);




export default router;
