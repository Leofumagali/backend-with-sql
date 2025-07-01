'use client'

import { CursoType } from "@/app/page";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { toast } from "sonner";

export default function CursoView({id, capa, nome, inscrito, descricao, inicio, inscricoes, inscricao_cancelada, isLoggedIn}: CursoType) {
  const { userToken } = useAuth();

  const handleEnroll = async () => {
    if (!userToken) {
      toast.error("Logue na plataforma para se inscrever.")
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/cursos/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      await res.json()

      if (!res.ok) throw new Error('Erro ao se inscrever.')

      toast.success('Inscrição realizada com sucesso.')
      location.reload()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const handleCancel = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error("Você precisa estar logado.")
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/cursos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (!res.ok) throw new Error('Erro ao cancelar inscrição.')

      toast.success('Inscrição cancelada com sucesso.')
      location.reload()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-lg">
      <figure className="relative aspect-video">
        <Image
          src={capa}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={nome}
          fill
          priority
        />
        {inscrito && (
          <figcaption className="absolute top-4 left-4 text-xs px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded-full shadow-sm">
            Você já se inscreveu nesse curso
          </figcaption>
        )}
      </figure>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-semibold text-gray-800">{nome}</h3>
        <p className="text-sm text-gray-600 flex-1">{descricao}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
            {inscricoes} inscritos
          </span>
          <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">
            Inicia em{" "}
            {inicio.toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {inscrito 
        ? <button onClick={handleCancel} className="w-full text-center p-3 bg-gray-200 hover:bg-red-300 transition text-gray-800 font-medium">
            Cancelar inscrição
          </button> 
        : inscricao_cancelada 
            ? <p className="bg-red-100 text-red-700 text-sm p-3 text-center font-medium">
                Inscrição cancelada
              </p>
            : <button onClick={handleEnroll} className="w-full text-center p-3 bg-blue-400 hover:bg-blue-500 transition text-white font-medium">
                Fazer inscrição
              </button>
      }
    </div>
  );
}