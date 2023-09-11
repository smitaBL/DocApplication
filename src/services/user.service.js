import { session } from '../models/user.model'
import { uid } from 'uid';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken'


//create new user
export const registerNewUser = async (body) => {

  const { firstName, lastName, email, password } = body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const existingUserResult = await session.run(
    'MATCH (u:User {email: $email}) RETURN u',
    { email }
  );

  if (existingUserResult.records.length > 0) {
    throw new Error("Username already exists")
  }

  let _id = uid();

  const createUserResult = await session.run(
    'CREATE (u:User { _id : $_id,firstName: $firstName, lastName:$lastName, email:$email, password:$password}) RETURN u',
    { _id, firstName, lastName, email, password: hashedPassword }
  );

  const createdUser = createUserResult.records[0].get('u').properties;


  return createdUser
};

export const userLogin = async (body) => {

  const { email, password } = body;
  const userResult = await session.run(
    'MATCH (u:User {email: $email}) RETURN u.password as password',
    { email }
  );

  if (userResult.records.length === 0) {
    throw new Error("User not found")
  }

  const hashedPassword = userResult.records[0].get('password');


  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  if (!passwordMatch) {

    throw new Error('Incorrect password')

  }
  const payload = { email };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

  return token;
};


