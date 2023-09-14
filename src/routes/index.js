import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import hospitalRoute from './hospital.route'
import doctorRoute from "./doctore.route"
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/hospital', hospitalRoute);
  router.use('/doctor', doctorRoute);

  return router;
};

export default routes;
