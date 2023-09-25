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

  const { doctorId, hospitalId } = body


  const result = await session.run(`
    MATCH (d:Doctor)
    WHERE d.id = $doctorId
    MATCH (h:Hospital)
    WHERE h.id = $hospitalId
    MERGE (d)-[:WORKS_AT]->(h)
    RETURN d, h
  `, { doctorId, hospitalId });

  const doctor = result.records[0].get('d').properties;
  const hospital = result.records[0].get('h').properties;

  return { doctor, hospital }

}


export const getAllHospitalDetail = async () => {
  const result = await session.run(`
      MATCH (h:Hospital)
      RETURN h
    `);

  const hospitals = result.records.map(record => record.get('h').properties);

  return hospitals;

}

export const bookAppointment = async (body) => {

  const { userId, doctorId, hospitalId, appointmentDate } = body;
  const currentTime = new Date();

  const appointmentTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  const result = await session.run(`
      MATCH (u:User)
      WHERE u.email = $userId
      MATCH (d:Doctor)
      WHERE d.id = $doctorId
      MATCH (h:Hospital)
      WHERE h.id = $hospitalId
      CREATE (u)-[:BOOKED]->(a:Appointment { date: $appointmentDate, time: $appointmentTime })
      CREATE (a)-[:WITH_DOCTOR]->(d)
      CREATE (a)-[:AT_HOSPITAL]->(h)
      RETURN a
    `, { userId, doctorId, hospitalId, appointmentDate, appointmentTime });


  const appointment = result.records[0].get('a').properties;

  return appointment;


}


export let appointmentHistory = async (body) => {

  const userId = body.userId

  const result = await session.run(`
  MATCH (u:User)-[:BOOKED]->(a:Appointment)-[:WITH_DOCTOR]->(d:Doctor)
  WHERE u.email = $userId
  RETURN a, d
`, { userId });

  const appointments = result.records.map(record => {
    const appointment = record.get('a').properties;
    const doctor = record.get('d').properties;
    return { appointment, doctor };
  });

  return appointments;

}