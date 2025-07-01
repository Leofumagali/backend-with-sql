import { enrollUserInCourse, listUserEnrolledCourses, cancelUserEnrollment } from '../services/enrollments.service.js';

export async function enrollCourse(req, res) {
  const { idCurso } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({ mensagem: 'Usuário não autenticado' });
  }

  try {
    await enrollUserInCourse({ userId, courseId: idCurso });
    return res.status(200).json({ mensagem: 'Inscrição realizada com sucesso' });
  } catch (error) {
    if (error.message === 'Curso não encontrado') {
      return res.status(404).json({ mensagem: error.message });
    }
    return res.status(400).json({ mensagem: error.message });
  }
}

export async function listUserEnrollments(req, res) {
  const { idUsuario } = req.params;
  const userId = req.user?.id;

  if (!userId || Number(idUsuario) !== userId) {
    return res.status(403).json({ mensagem: 'Acesso negado' });
  }

  try {
    const cursos = await listUserEnrolledCourses(userId);
    return res.status(200).json(cursos);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

export async function cancelEnrollment(req, res) {
  const { idCurso } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({ mensagem: 'Usuário não autenticado' });
  }

  try {
    await cancelUserEnrollment({ userId, courseId: idCurso });
    return res.status(200).json({ mensagem: 'Inscrição cancelada com sucesso' });
  } catch (error) {
    if (error.message === 'Curso não encontrado') {
      return res.status(404).json({ mensagem: error.message });
    }
    return res.status(400).json({ mensagem: error.message });
  }
}