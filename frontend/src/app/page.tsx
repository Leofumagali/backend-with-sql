'use client'

import Curso from '@/components/curso'
import { Header } from '@/components/Header'
import { useEffect, useState } from 'react'

export type CursoType = {
  id: string
  nome: string
  descricao: string
  capa: string
  inscricoes: number
  inicio: Date
  inscrito: boolean
  inscricao_cancelada: boolean
  isLoggedIn: boolean
}

export default function Page() {
  const [cursos, setCursos] = useState<CursoType[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch('http://localhost:3001/cursos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filtro: '' })
        })

        const data = await res.json()

        const cursosComData = data.map((curso: any) => ({
          ...curso,
          inicio: new Date(curso.inicio)
        }))

        setCursos(cursosComData)
      } catch (err) {
        console.error('Erro ao carregar cursos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCursos()
  }, [])

  return (
    <main className='flex flex-col flex-1'>
      <Header />
      <h2 className="px-24 page-title">Cursos</h2>
      {loading ? (
        <p className="text-center text-gray-500">Carregando cursos...</p>
      ) : (
        <div className="px-24 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <Curso
              key={curso.id}
              id={curso.id}
              capa={curso.capa}
              nome={curso.nome}
              inscrito={curso.inscrito}
              descricao={curso.descricao}
              inicio={curso.inicio}
              inscricoes={curso.inscricoes}
              inscricao_cancelada={curso.inscricao_cancelada}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </main>
  );
}
