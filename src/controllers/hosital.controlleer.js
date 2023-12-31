import HttpStatus from 'http-status-codes'
import * as hospitalService from '../services/hospital.service'

export const addHospitalDeatils = async (req, res) => {
  try {
    const data = await hospitalService.addHospitalDeatils(req.body)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Hospital Detail added successfully'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
}

export const addHospitalDoctorsDeatails = async (req, res) => {
  try {
    const data = await hospitalService.addHospitalDoctorsDeatails(req.body)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Details added successfully'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
}

export const getAllHospitalDetail = async (req, res) => {
  try {
    const data = await hospitalService.getAllHospitalDetail()
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Details retrieved successfully'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
}

export const bookAppointment = async (req, res) => {
  try {
    const data = await hospitalService.bookAppointment(req.body)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Details added successfully'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
}

export const appointmentHistory = async (req, res) => {
  try {
    const data = await hospitalService.appointmentHistory(req.body)
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Details added successfully'
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
}
