import express from 'express'
import * as hospitalController from '../controllers/hosital.controlleer'

const router = express.Router()

//route to create a new user
router.post('', hospitalController.addHospitalDeatils)

//route to create a new user
router.post(
  '/hospitaldoctorsdetails/:hospitalid',
  hospitalController.addHospitalDoctorsDeatails
)

router.get('', hospitalController.getAllHospitalDoctorDetail)

export default router
