import { session } from '../models/user.model'
import { uid } from 'uid';

export const addHospitalDeatils = async (body) => {
  const { hospitalName, location } = body

  let id = uid(15);

  const isExisting = await session.run(
    'MATCH (h:Hopsital {hospitalName: $hospitalName, location: $location}) RETURN h',
    { hospitalName, location }
  )

  if (isExisting.records.length > 0) {
    throw new Error('Hospital with this name already added')
  }

  const result = await session.run(`
      CREATE (h:Hospital { id:$id ,hospitalName: $hospitalName, location: $location })
      RETURN ID(h) AS hospitalId, h.id as id, h.hospitalName as hospitalName, h.location as hospitalLocation;
    `, { id, hospitalName, location });

  const record = result.records[0];
  const hospitalId = record.get('hospitalId').toNumber();
  const Id = record.get('id');
  const hositalname = record.get('hospitalName');
  const hospitallocation = record.get('hospitalLocation');

  return { hospitalId, Id, hositalname, hospitallocation };


}

export const addHospitalDoctorsDeatails = async (body) => {
  const { hospitalId, doctorName, specialty } = body;

  console.log("req------------->", body)
  // const result = await session.run(`
  //   MATCH (d:Doctor)
  //   WHERE ID(d) = $doctorId
  //   MATCH (h:Hospital)
  //   WHERE ID(h) = $hospitalId
  //   MERGE (d)-[:WORKS_AT]->(h)
  //   RETURN d, h
  // `, { doctorId, hospitalId });

  // const doctor = result.records[0].get('d').properties;
  // const hospital = result.records[0].get('h').properties;

  // return { doctor, hospital }



  const cypherQuery = `
      MATCH (h: Hospital {hospitalId: $hospitalId})
      CREATE (d:Doctor { doctorName: $doctorName, specialty:$specialty })
      CREATE (d)-[r:WORK_AT]->(h)
      RETURN h, d 
    `;

  const result = await session.run(cypherQuery, { doctorName, specialty, hospitalId });

  if (result.records.length === 0) {
    throw new Error("No results found.")
  }
  const doctor = result.records[0].get('d').properties;
  const hospital = result.records[0].get('h').properties;

  return { doctor, hospital }


}


export const getAllHospital = async () => {
  const result = await session.run(`
      MATCH (h:Hospital)
      RETURN h
    `);

  const hospitals = result.records.map(record => record.get('h').properties);

  return hospitals;

}
