'use client'

import { Header } from "@/components/Header";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/usuarios', {
        nome,
        nascimento,
        email,
        senha
      });
      
      router.push('/login');
      
      toast.success("Cadastro feito com sucesso!")
    } catch (err) {
      const error = err as AxiosError<{ mensagem: string }>;
      setError(error.response?.data?.mensagem || 'Erro ao cadastrar.');
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <Header />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-md border border-gray-200 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-gray-700">Cadastro</h2>

        {error && (
          <p className="absolute text-red-500 text-center text-sm right-10 top-20 line-clamp-1">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-sm text-gray-700">Nome</label>
            <input
              type="text"
              required
              name="nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nascimento" className="text-sm text-gray-700">Data de nascimento</label>
            <input
              type="date"
              required
              name="nascimento"
              id="nascimento"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              className="h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

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
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-blue-500 hover:underline transition">
              Faça login
            </Link>
          </p>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 active:scale-95 transition px-6 py-2 text-white rounded-lg font-medium"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  );
}