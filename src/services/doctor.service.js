import { session } from '../models/user.model'
import { uid } from 'uid';

export const addDoctorDeatils = async (body) => {

    let id = uid(15);

    const { doctorName, specialty } = body;

    const isExisting = await session.run(
        'MATCH (d:Doctor {doctorName: $doctorName, specialty: $specialty}) RETURN d',
        { doctorName, specialty }
    );

    if (isExisting.records.length > 0) {
        throw new Error("Doctor deatails are already added")
    }

    const result = await session.run(`
      CREATE (d:Doctor {id:$id, doctorName: $doctorName, specialty:$specialty  })
      RETURN ID(d) AS doctorId, d.id as id,d.doctorName AS doctorName, d.specialty AS doctorSpecialty;
    `, { id, doctorName, specialty });


    const record = result.records[0];
    const doctorId = record.get('doctorId').toNumber();
    const Id = record.get('id');
    const docName = record.get('doctorName');
    const doctorSpecialty = record.get('doctorSpecialty');


    return { doctorId, Id, docName, doctorSpecialty };
};

export const addReview = async (body) => {

    const id = uid(15);

    const { userId, doctorId, reviewText, rating } = body;

    const result = await session.run(`
      MATCH (u:User)
      WHERE u.email = $userId
      MATCH (d:Doctor)
      WHERE d.id = $doctorId
      CREATE (u)-[:WROTE]->(r:Review { id:$id,text: $reviewText, rating: $rating })
      CREATE (r)-[:FOR_DOCTOR]->(d)
      RETURN r
    `, { userId, doctorId, reviewText, rating, id });

    const review = result.records[0].get('r').properties;

    return review;


};