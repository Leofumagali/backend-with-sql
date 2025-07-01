import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export async function buscarPorEmail(email) {
  const usuario = await prisma.usuario.findUnique({
    where: { email }
  });
  return usuario;
}

export async function salvarUsuario({ nome, email, senha, nascimento }) {
  await prisma.usuario.create({
    data: {
      nome,
      email,
      senha,
      nascimento: new Date(nascimento)
    }
  });
}