import HttpStatus from 'http-status-codes'
import * as hospitalService from '../services/hospital.service'

export const addHospitalDeatils = async (req, res) => {
    try {
        const data = await hospitalService.addHospitalDeatils(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Hospital Detail added successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};