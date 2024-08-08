import express from 'express';
import authRoute from './auth.route.js';
import resumeRoute from './resume.route.js'


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/resume',
    route: resumeRoute,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;
