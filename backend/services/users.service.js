import bcrypt from 'bcrypt';
import { salvarUsuario, buscarPorEmail } from '../models/users.model.js';

export async function registrarUsuario({ nome, email, senha, nascimento }) {
  const existente = await buscarPorEmail(email);
  if (existente) {
    throw new Error('E-mail já cadastrado');
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  await salvarUsuario({ nome, email, senha: senhaHash, nascimento });
}