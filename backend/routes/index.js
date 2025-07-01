import express from 'express';
import authRoutes from './auth.routes.js'
import usersRoutes from './users.routes.js';
import coursesRoutes from './courses.routes.js'

const router = express.Router();

router.use(authRoutes);
router.use(usersRoutes);
router.use(coursesRoutes)

export default router;