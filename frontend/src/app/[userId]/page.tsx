'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Curso from '@/components/curso'
import { useAuth } from '../../context/AuthContext'
import { CursoType } from '../page'
import { Header } from '@/components/Header'

export default function UserCoursesPage({ params }: { params: Promise<{ userId: string }> }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const { userId } = use(params)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch(`http://localhost:3001/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.mensagem || 'Erro ao carregar cursos.')
        }
        return res.json()
      })
      .then(data => {
        const parsed = data.map((curso: CursoType) => ({
          ...curso,
          inicio: new Date(curso.inicio),
        }));
        setCourses(parsed);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isLoggedIn, userId, router])

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <main className="flex flex-col justify-center items-center">
      <Header />
      <h2 className="page-title">Meus Cursos</h2>
      {loading ? (
              <p className="text-center text-gray-500">Carregando cursos...</p>
            ) : courses.length === 0 
                  ? <span className='text-gray-700'>Você ainda não se inscreveu em nenhum curso.</span>
                  : (
              <div className="px-24 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((curso: CursoType) => (
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
            )
      }
    </main>
  )
}