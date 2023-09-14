import { session } from '../models/user.model'
import { uid } from 'uid';

export const addDoctorDeatils = async (body) => {

    console.log(body)

    const { doctorName, specialty } = body;

    const isExisting = await session.run(
        'MATCH (d:Doctor {doctorName: $doctorName, specialty: $specialty}) RETURN d',
        { doctorName, specialty }
    );

    if (isExisting.records.length > 0) {
        throw new Error("Doctor deatails are already added")
    }

    let _id = uid();

    const addedResult = await session.run(
        'CREATE (d:Doctor { _id : $_id, doctorName: $doctorName, specialty:$specialty }) RETURN d',
        { _id, doctorName, specialty }
    );

    const addedDoctor = addedResult.records[0].get('d').properties;


    return addedDoctor;
};