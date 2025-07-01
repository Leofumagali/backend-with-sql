import { Router } from 'express';
import { listCourses } from '../controllers/courses.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { enrollCourse, listUserEnrollments, cancelEnrollment } from '../controllers/enrollments.controller.js';

const router = Router();

router.post('/cursos', listCourses);
router.post('/cursos/:idCurso', authMiddleware, enrollCourse);
router.delete('/cursos/:idCurso', authMiddleware, cancelEnrollment);
router.get('/:idUsuario', authMiddleware, listUserEnrollments);

export default router;