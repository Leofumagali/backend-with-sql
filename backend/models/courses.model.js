import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

export async function findCourseById(id) {
  return prisma.curso.findUnique({ where: { id } });
}

export async function getAllCourses({ filtro }) {
  const cursos = await prisma.curso.findMany({
    orderBy: {
      inicio: 'asc'
    },
    include: {
      inscricoesList: {
        where: {
          dataCancelamento: null
        },
        select: {
          id: true
        }
      }
    }
  })

  const cursosFiltrados = filtro
  ? cursos.filter(c =>
      c.nome.toLowerCase().includes(filtro.toLowerCase())
    )
  : cursos;

  return cursosFiltrados.map(curso => ({
    ...curso,
    inscricoes: curso.inscricoesList.length,
    inscricoesList: undefined
  }))
}