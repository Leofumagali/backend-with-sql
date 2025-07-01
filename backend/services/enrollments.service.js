import { findCourseById } from '../models/courses.model.js';
import {
  findEnrollment,
  countActiveEnrollmentsByCourse,
  createEnrollment,
  getUserEnrollments,
  cancelEnrollment
} from '../models/enrollments.model.js';

export async function enrollUserInCourse({ userId, courseId }) {
  const curso = await findCourseById(courseId);
  if (!curso) {
    throw new Error('Curso não encontrado');
  }

  const jaInscrito = await findEnrollment(userId, courseId);
  
  if (jaInscrito && !jaInscrito.dataCancelamento) {
    throw new Error('Usuário já está inscrito neste curso');
  }
  
  if(jaInscrito && jaInscrito.dataCancelamento) {
    throw new Error('Usuário não pode se inscrever novamente');
  }

  await createEnrollment(userId, courseId);
}

export async function listUserEnrolledCourses(userId) {
  const enrollments = await getUserEnrollments(userId);

  const coursesWithCounts = await Promise.all(
    enrollments.map(async (e) => {
      const count = await countActiveEnrollmentsByCourse(e.cursoId)

      return {
        id: e.cursoId,
        nome: e.curso.nome,
        descricao: e.curso.descricao,
        capa: e.curso.capa,
        inscricoes: count,
        inicio: e.curso.inicio,
        inscricao_cancelada: !!e.dataCancelamento,
        inscrito: !e.dataCancelamento
      }
    })
  )
  return coursesWithCounts
}

export async function cancelUserEnrollment({ userId, courseId }) {
  const course = await findCourseById(courseId);
  if (!course) {
    throw new Error('Curso não encontrado');
  }

  const enrollment = await findEnrollment(userId, courseId)

  if (!enrollment || enrollment.dataCancelamento) {
    throw new Error('Usuário não está inscrito neste curso');
  }

  await cancelEnrollment(userId, courseId);
}