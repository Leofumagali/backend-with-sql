import { authenticateUser } from '../services/auth.service.js';

export async function loginUser(req, res) {
  const { email, senha } = req.body || {};

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' });
  }

  try {
    const {token, userId} = await authenticateUser(email, senha);
    
    res.status(200).json({
      mensagem: 'Login realizado com sucesso',
      userId,
      token
    });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}