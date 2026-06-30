import { useState } from "react"
import { toast } from "react-toastify"
import minhaSA from "../../service/minhaSA"

import { FaUser, FaLock, FaBuilding, FaDoorOpen, FaUserPlus } from "react-icons/fa"


function FormRegister({ Voltar }) {

    const [nome, setNome] = useState("")
    const [bloco, setBloco] = useState("")
    const [apartamento, setApartamento] = useState("")
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            // validação bloco
            if (!["A", "B"].includes(bloco)) {
                toast.error("O bloco deve ser A ou B")
                return
            }

            // validação apartamento
            const apartamentoValido =
                /^[1-4]0[1-8]$/.test(apartamento) ||
                /^50[1-2]$/.test(apartamento)

            if (!apartamentoValido) {
                toast.error(
                    "Apartamento inválido. Utilize 101-108, 201-208, 301-308, 401-408, 501 ou 502."
                )
                return
            }

            const novoUsuario = {
                nome,
                bloco,
                num_ap: apartamento,
                usuario,
                senha
            }

            await minhaSA.post("/moradores", novoUsuario)

            toast.success("Usuário cadastrado com sucesso")

            // limpa formulário
            setNome("")
            setBloco("")
            setApartamento("")
            setUsuario("")
            setSenha("")

            // opcional: volta para login/home
            Voltar()

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Erro ao cadastrar usuário"
            )
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full text-left"
        >

            {/* Nome */}
            <label className="flex flex-col gap-1">
                <span className="font-semibold text-cyan-950 ml-1">
                    Residente:
                </span>

                <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                        required
                    />
                </div>
            </label>

            {/* Bloco + Apartamento */}
            <div className="flex gap-4">

                <label className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-cyan-950 ml-1">
                        Bloco:
                    </span>

                    <div className="relative">
                        <FaBuilding
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />

                        <select
                            value={bloco}
                            onChange={(e) => setBloco(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                </label>

                <label className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-cyan-950 ml-1">
                        Número:
                    </span>

                    <div className="relative">
                        <FaDoorOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            maxLength={3}
                            placeholder="Ex: 102"
                            value={apartamento}
                            onChange={(e) =>
                                setApartamento(e.target.value.replace(/\D/g, ""))
                            }
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                            required
                        />
                    </div>
                </label>

            </div>

            {/* Usuário + Senha */}
            <div className="flex gap-4">

                <label className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-cyan-950 ml-1">
                        Usuário:
                    </span>

                    <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Seu usuário"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                            required
                        />
                    </div>
                </label>

                <label className="flex flex-col gap-1 flex-1">
                    <span className="font-semibold text-cyan-950 ml-1">
                        Senha:
                    </span>

                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="password"
                            placeholder="********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-cyan-950 bg-white text-cyan-950 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-300"
                            required
                        />
                    </div>
                </label>

            </div>

            {/* Botão */}
            <button type="submit"
                className="w-full h-12 bg-cyan-950 text-2xl text-yellow-400 rounded-xl font-bold cursor-pointer transition-all duration-200 hover:bg-cyan-700 hover:scale-105 active:bg-cyan-500 active:scale-95 flex items-center justify-center gap-2">
                <span>Cadastrar</span>
                <FaUserPlus size={24} />
            </button>

            {/* Voltar */}
            <div className="flex justify-center">
                <button type="button" onClick={Voltar}
                    className="flex items-center gap-1 text-cyan-950 hover:text-cyan-700">
                    Voltar
                </button>
            </div>

        </form>
    )
}

export default FormRegister