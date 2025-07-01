import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { buscarPorEmail } from '../models/users.model.js';

export async function authenticateUser(email, senha) {
  const usuario = await buscarPorEmail(email);
  if (!usuario) {
    throw new Error('E-mail ou senha inválidos');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error('E-mail ou senha inválidos');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    userId: usuario.id
  };
}