import { session } from '../models/user.model'
import { uid } from 'uid';

export const addHospitalDeatils = async (body) => {

    const { hospitalName, location } = body;

    const isExisting = await session.run(
        'MATCH (h:Hopsital {hospitalName: $hospitalName, location: $location}) RETURN h',
        { hospitalName, location }
    );

    if (isExisting.records.length > 0) {
        throw new Error("Hospital with this name already added")
    }

    let _id = uid();

    const addedResult = await session.run(
        'CREATE (h:Hopsital { _id : $_id, hospitalName: $hospitalName, location:$location }) RETURN h',
        { _id, hospitalName, location }
    );

    const addedHospital = addedResult.records[0].get('h').properties;


    return addedHospital;
};