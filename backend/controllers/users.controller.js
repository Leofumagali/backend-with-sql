import { registrarUsuario } from '../services/users.service.js';

export async function criarUsuario(req, res) {
  const { nome, email, senha, nascimento } = req.body || {};

  if (!nome || !email || !senha || !nascimento) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }

  try {
    await registrarUsuario({ nome, email, senha, nascimento });
    res.status(200).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}