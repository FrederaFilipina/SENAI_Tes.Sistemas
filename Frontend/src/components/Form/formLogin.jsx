import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import minhaSA from '../../service/minhaSA'

import { FaUser, FaLock } from 'react-icons/fa';
import { GiExitDoor } from "react-icons/gi";

function FormLogin({ Voltar, irCadastro }) {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const response = await minhaSA.post('/login', {
                usuario,
                senha
            })

            localStorage.setItem(
                'usuarioLogado',
                JSON.stringify(response.data.morador)
            )

            navigate('/homescreen')

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                'Usuário ou senha inválidos'
            )
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full text-left"
            >
                <div className="flex gap-4">
                    <label className="flex flex-col gap-1 flex-1">
                        <span className="font-semibold text-cyan-950 ml-1">
                            Usuário:
                        </span>

                        <div className="relative">
                            <FaUser
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />

                            <input
                                type="text"
                                placeholder="Seu usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-1 flex-1">
                        <span className="font-semibold text-cyan-950 ml-1">
                            Senha:
                        </span>

                        <div className="relative">
                            <FaLock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />

                            <input
                                type="password"
                                placeholder="********"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                            />
                        </div>
                    </label>
                </div>

                {/* Botão Entrar */}
                <div>
                    <button

                        className="w-full h-15 bg-cyan-950 text-2xl text-white rounded-xl font-bold cursor-pointer transition-all duration-200 hover:bg-cyan-700 hover:scale-105 active:bg-cyan-500 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Entre</span>
                        <GiExitDoor size={35} />
                    </button>
                </div>

                {/* Voltar e Esqueci a senha */}
                <div className="flex items-center justify-around">

                    <button
                        type="button"
                        onClick={Voltar}
                        className="flex items-center cursor-pointer text-cyan-950 hover:text-cyan-700"
                    >
                        <span>Voltar</span>
                    </button>

                    <a href="#" className="text-sm text-cyan-950 hover:text-cyan-700 underline">
                        Esqueci minha senha
                    </a>

                </div>


                {/* Cadastro */}
                <p className="text-center text-gray-600 mt-2">
                    Não tem uma conta?{" "}
                    <button
                        type="button"
                        onClick={irCadastro}
                        className="text-yellow-500 font-semibold hover:underline cursor-pointer"
                    >
                        Cadastre-se
                    </button>
                </p>
            </form>


        </>
    )
}

export default FormLogin