
import neo4j from 'neo4j-driver'

import dotenv from 'dotenv';
dotenv.config();



const driver = neo4j.driver(process.env.URL,
  neo4j.auth.basic(process.env.USER_NAME, process.env.PASSWORD),
  {/* encrypted: 'ENCRYPTION_OFF' */ });



export const session = driver.session(process.env.DATABASE);
