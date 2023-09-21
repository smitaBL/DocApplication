import express from 'express'
import * as hospitalController from '../controllers/hosital.controlleer'

const router = express.Router()

router.post('', hospitalController.addHospitalDeatils)


router.get('', hospitalController.getAllHospitalDetail)

router.post(
  '/hospitaldoctorsdetails',
  hospitalController.addHospitalDoctorsDeatails
)



export default router
