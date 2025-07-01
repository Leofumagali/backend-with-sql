'use client'

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";

export default function Page() {
  const { login } = useAuth()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/login', { email, senha });

      const {token, userId} = res.data;
      
      if (token && userId) {
        login(token, userId)
        router.push(`/${userId}`);
      } else {
        setError('Dados de autenticação incompletos.');
      }
    } catch (err) {
      const error = err as AxiosError<{ mensagem: string }>;
      setError(error.response?.data?.mensagem || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Header />
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md border border-gray-200 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha" className="text-sm text-gray-700">Senha</label>
          <input
            type="password"
            required
            name="senha"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>
        <div className="flex flex-row justify-between items-center text-sm">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/cadastro" className="text-blue-500 hover:underline transition">
              Crie aqui!
            </Link>
          </p>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition px-6 py-2 text-white rounded-lg font-medium"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}