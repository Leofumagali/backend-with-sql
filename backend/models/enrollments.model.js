import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export async function findEnrollment(userId, courseId) {
  return prisma.inscricao.findUnique({
    where: {
      usuarioId_cursoId: { 
        usuarioId: userId, 
        cursoId: courseId 
      }
    }
  });
}

export async function createEnrollment(userId, courseId) {
  await prisma.inscricao.create({
    data: {
      usuarioId: userId,
      cursoId: courseId,
      dataInscricao: new Date()
    }
  });
}

export async function getUserEnrollments(userId) {
  return prisma.inscricao.findMany({
    where: { usuarioId: userId },
    include: {
      curso: true
    }
  })
}

export async function countActiveEnrollmentsByCourse(courseId) {
  return prisma.inscricao.count({
    where: {
      cursoId: courseId,
      dataCancelamento: null
    }
  })
}

export async function cancelEnrollment(userId, courseId) {
  const result = await prisma.inscricao.update({
    where: {
      usuarioId_cursoId: {
        usuarioId: userId,
        cursoId: courseId
      }
    },
    data: {
      dataCancelamento: new Date()
    }
  });

  await prisma.curso.update({
    where: { id: courseId },
    data: { inscricoes: { decrement: 1 } }
  });

  return result;
}