'use client'

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { FaChalkboardTeacher, FaUserPlus, FaSignInAlt } from "react-icons/fa"

export const Header = () => {
  const { isLoggedIn, logout, userId } = useAuth()

  return (
    <header className="flex-1 w-screen mb-10 py-12 px-24 flex justify-between shadow-sm border-b border-gray-200">
      <div className="space-y-2">
        <h1 className="text-5xl font-extrabold text-blue-500 hover:text-blue-600 active:scale-95 transition-transform duration-150">
          <Link href="/">
          Bastet
          </Link>
        </h1>
        <p className="text-lg text-gray-500">
          Uma nova plataforma de cursos para o seu futuro
        </p>
      </div>
      <menu className="flex flex-row gap-4 items-center">
        <Link href={`/${userId}`}>
          <span className="flex items-center gap-2 text-blue-400 underline hover:text-blue-500 active:scale-95 transition-transform duration-150">
            <FaChalkboardTeacher size={16} />
            Meus cursos
          </span>
        </Link>

        {!isLoggedIn && <Link href="/cadastro">
          <span className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 active:scale-95 transition-transform duration-150">
            <FaUserPlus size={16} />
            Fazer cadastro
          </span>
        </Link>}


        {
          isLoggedIn 
            ? <Link href="/">
                <span onClick={() => logout()} className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 active:scale-95 transition-transform duration-150">
                  <FaSignInAlt size={16} />
                  Sair
                </span>
              </Link>
            : <Link href="/login">
                <span className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 active:scale-95 transition-transform duration-150">
                  <FaSignInAlt size={16} />
                  Fazer login
                </span>
              </Link>
        }
      </menu>
    </header>
  )
}