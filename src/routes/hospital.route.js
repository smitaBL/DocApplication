import express from 'express'
import * as hospitalController from '../controllers/hosital.controlleer'
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('', hospitalController.addHospitalDeatils)


router.get('', hospitalController.getAllHospitalDetail)

router.post(
  '/hospitaldoctorsdetails',
  hospitalController.addHospitalDoctorsDeatails
)

router.post('/bookappointment', userAuth, hospitalController.bookAppointment)

router.get('/appointmenthistory', userAuth, hospitalController.appointmentHistory)



export default router
