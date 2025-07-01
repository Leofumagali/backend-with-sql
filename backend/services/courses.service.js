import { getAllCourses } from '../models/courses.model.js';
import { getUserEnrollments } from '../models/enrollments.model.js';

export async function listAvailableCourses({ userId, filter }) {
  const courses = await getAllCourses({ filtro: filter });

  if (!userId) {
    return courses.map(course => ({
      ...course,
      inscrito: false
    }));
  }

  const cursosInscritos = await getUserEnrollments(userId);
  const idsInscritos = new Set(cursosInscritos.map(c => c.cursoId));

  return courses.map(course => ({
    ...course,
    inscrito: idsInscritos.has(course.id)
  }));
}