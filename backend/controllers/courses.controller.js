import { listAvailableCourses } from '../services/courses.service.js';
import jwt from 'jsonwebtoken';

export async function listCourses(req, res) {
  let userId;
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      userId = null;
      console.log("Erro no JWT:", err.name, err.message);
    }
  }

  try {
    const filtro = req.body?.filtro?.toLowerCase();

    const cursos = await listAvailableCourses({ userId, filter: filtro });
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar cursos', error: error.message });
  }
}