import HttpStatus from 'http-status-codes'

import * as docterService from '../services/doctor.service'

export const addDoctorDeatils = async (req, res) => {
    try {
        const data = await docterService.addDoctorDeatils(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Doctor Details added successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const addReview = async (req, res) => {
    try {
        const data = await docterService.addReview(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Review added successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};