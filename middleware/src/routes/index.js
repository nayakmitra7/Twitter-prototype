import express from 'express';
import userRoutes from './userRoutes';
import imageUploadRoute from './imageUploadRoute';
import tweetRoutes from './tweetRoutes';
import searchRoutes from './searchRoutes';
import messageRoutes from './messageRoutes';
import analyticRoutes from './analyticRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/image', imageUploadRoute);
// TODO: Add authentication with passport
routes.use('/tweet', tweetRoutes);
routes.use('/search', searchRoutes);
routes.use('/message', messageRoutes);
routes.use('/analytic', analyticRoutes);
export default routes;
