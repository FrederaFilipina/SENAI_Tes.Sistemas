import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import minhaSA from "../../service/minhaSA"
import { FaUserAstronaut } from "react-icons/fa6";

function BttnUsuario() {

  const navigate = useNavigate()
  const usuarioStorage = JSON.parse(localStorage.getItem("usuarioLogado"))
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [nome, setNome] = useState("")
  const [bloco, setBloco] = useState("")
  const [num_ap, setNumAp] = useState("")
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  useEffect(() => {

    async function carregarUsuario() {

      try {

        const response = await minhaSA.get(`/moradores/${usuarioStorage.id}`)
        const dados = response.data

        setUsuarioLogado(dados)
        setNome(dados.nome)
        setBloco(dados.bloco)
        setNumAp(dados.num_ap)
        setUsuario(dados.usuario)

      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        toast.error("Erro ao carregar informações do usuário")
      }

    }

    if (usuarioStorage?.id) { carregarUsuario() }

  }, [])

  async function handleSalvar(e) {

    e.preventDefault()

    try {

      if (!["A", "B"].includes(bloco)) {
        toast.error("O bloco deve ser A ou B")
        return
      }

      const apartamentoValido = /^[1-4]0[1-8]$/.test(num_ap) || /^50[1-2]$/.test(num_ap)

      if (!apartamentoValido) {
        toast.error("Apartamento inválido. Utilize números entre 101-108, 201-208, 301-308, 401-408, 501 ou 502.")
        return
      }

      const response = await minhaSA.get("/moradores")
      const usuariosSalvos = response.data
      const usuarioExiste = usuariosSalvos.find((u) => u.usuario === usuario && u.id !== usuarioLogado.id)

      if (usuarioExiste) {
        toast.error("Usuário já existe")
        return
      }

      console.log("usuarioLogado:", usuarioLogado)

      const usuarioAtualizado = {
        ...usuarioLogado,
        nome: nome.trim(),
        bloco,
        num_ap,
        usuario: usuario.trim()
      }

      console.log("Enviando:", usuarioAtualizado)
      await minhaSA.put(`/moradores/${usuarioLogado.id}`, usuarioAtualizado)

      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado))

      toast.success("Dados atualizados com sucesso")
      setTimeout(() => { window.location.reload() }, 1000)

      setModoEdicao(false)

    } catch (error) {

      console.error("Erro completo:", error)
      console.error("Resposta da API:", error.response?.data)

      toast.error(error.response?.data?.message || "Erro ao atualizar usuário")
    }
  }

  async function handleExcluirUsuario() {

    const confirmar = confirm("Tem certeza que deseja excluir sua conta?")

    if (!confirmar) {
      return
    }

    try {

      await minhaSA.delete(`/moradores/${usuarioLogado.id}`)

      localStorage.removeItem("usuarioLogado")
      toast.success("Usuário excluído com sucesso")

      navigate("/")

    } catch (error) {

      console.error(error)
      toast.error("Erro ao excluir usuário")
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-6 ">

      {/* Cabeçalho */}
      <header className="flex justify-between items-start mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-500">
            Gerencia suas informações cadastradas!
          </h1>
        </div>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Card Perfil */}
        <div>

          <div
            className=" h-full border-2 border-cyan-300 rounded-2xl p-8 text-center bg-cyan-900">

            <div
              className="w-30 h-30 mx-auto mb-4 rounded-full bg-cyan-950 border-4 border-cyan-300 flex items-center justify-center">
              <FaUserAstronaut size={75} className="text-yellow-500 -translate-y-1" />
            </div>

            <div className="flex justify-center items-center text-2xl">

              <span className="text-cyan-500 font-semibold">
                Usuáio:
              </span>

              <span className="px-3 py-1 text-yellow-500 text-2xl font-bold">
                {usuarioLogado?.usuario}
              </span>

            </div>

            <hr className="my-5" />
            <hr className="my-5" />

            <div className="flex justify-center">

              <div className="space-y-5">

                <div className="flex items-center gap-25">

                  <span className="w-27 text-cyan-500 font-bold text-xl">
                    Status
                  </span>

                  <span className="px-5 py-1 rounded-full bg-cyan-950 text-cyan-500 font-semibold">
                    ATIVO
                  </span>

                </div>


                <div className="flex items-center gap-40">

                  <span className="w-20 text-cyan-500 font-bold text-xl">
                    ID
                  </span>

                  <span className="text-cyan-500 font-bold text-xl">
                    #{usuarioLogado?.id}
                  </span>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Formulário */}
        <div className="lg:col-span-2">

          <div
            className="h-full w-150 bg-cyan-900 border-2 border-cyan-300 rounded-2xl p-5 shadow-sm">

            {!modoEdicao ? (

              <div className="space-y-6">

                {/* Nome */}
                <div>

                  <label className="block text-sm font-medium text-white mb-2">
                    Nome Completo:
                  </label>

                  <div id="usuario" type="text" value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-xl font-semibold text-white bg-cyan-950">
                    {usuarioLogado?.nome}
                  </div>

                </div>

                {/* Dados + botão alterar */}
                <div className="grid md:grid-cols-3 items-center gap-8">

                  {/* Bloco */}
                  <div className="flex flex-col items-start">

                    <label className="block text-sm font-medium text-white mb-2">
                      Bloco:
                    </label>

                    <div className="w-36 h-14 rounded-xl border border-white bg-cyan-950 text-xl font-semibold text-white flex items-center justify-center">
                      {usuarioLogado?.bloco}
                    </div>

                  </div>


                  {/* Apartamento */}
                  <div className="flex flex-col items-start">

                    <label className="block text-sm font-medium text-white mb-2 text-center">
                      Apartamento:
                    </label>

                    <div className="w-36 h-14 rounded-xl border border-white bg-cyan-950 text-xl font-semibold text-white flex items-center justify-center">
                      {usuarioLogado?.num_ap}
                    </div>

                  </div>


                  {/* Botão */}
                  <div className="h-full flex justify-baseline items-baseline-last">

                    <button
                      onClick={() => setModoEdicao(true)}
                      className="w-64 h-15 bg-cyan-950 border-2 border-cyan-500 text-xl text-cyan-500 rounded-xl font-bold transition-all duration-200 hover:bg-cyan-700 hover:text-cyan-950 hover:scale-105 active:bg-cyan-500 active:scale-95"
                    >
                      Alterar<br />
                      Informações
                    </button>

                  </div>
                </div>

                <hr />

                {/* Excluir */}
                <div className="flex justify-center">

                  <button
                    onClick={handleExcluirUsuario}
                    className="px-10 py-4 rounded-xl text-xl text-cyan-500 bg-cyan-950 border-2 border-cyan-600 transition-all duration-200 hover:text-white hover:bg-red-500 active:bg-red-700 active:text-white active:border-red-500"
                  >
                    Excluir Usuário
                  </button>

                </div>
              </div>

            ) : (

              <form onSubmit={handleSalvar} className="space-y-6">

                <div className="grid md:grid-cols-2 gap-8">

                  {/* Nome */}
                  <div className="md:col-span-2">

                    <label htmlFor="nome"
                      className="block text-sm font-medium text-white mb-2">
                      Nome Completo:
                    </label>

                    <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white bg-cyan-950 text-xl font-semibold text-white hover:border-cyan-300 focus:outline-none focus:border-cyan-500 focus:bg-yellow-500/50 transition-all" />

                  </div>

                  {/* Usuário */}
                  <div className="md:col-span-2">

                    <label htmlFor="usuario"
                    className="block text-sm font-medium text-white mb-2">
                      Usuário:
                    </label>

                    <input id="usuario" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white bg-cyan-950 text-xl font-semibold text-white hover:border-cyan-300 focus:outline-none focus:border-cyan-500 focus:bg-yellow-500/50 transition-all" />

                  </div>


                  {/* Bloco */}
                  <div className="flex flex-col items-start">

                    <label htmlFor="bloco"
                    className="block text-sm font-medium text-white mb-2">
                      Bloco:
                    </label>

                    <select id="bloco" value={bloco} onChange={(e) => setBloco(e.target.value)}
                      className="w-36 h-14 rounded-xl border border-white bg-cyan-950 text-xl font-semibold text-white text-center hover:border-cyan-300 focus:outline-none focus:border-cyan-500 focus:bg-yellow-500/50 transition-all" >

                      <option value="A" className="bg-white text-black"> Bloco A </option>
                      <option value="B" className="bg-white text-black"> Bloco B </option>

                    </select>

                  </div>

                  {/* Apartamento */}
                  <div className="flex flex-col items-start">

                    <label htmlFor="apartamento"
                    className="block text-sm font-medium text-white mb-2">
                      Apartamento:
                    </label>

                    <input id="apartamento" type="text" value={num_ap}
                      onChange={(e) => setNumAp(e.target.value.replace(/\D/g, ""))}
                      className="w-36 h-14 rounded-xl border border-white bg-cyan-950 text-xl font-semibold text-white text-center hover:border-cyan-300 focus:outline-none focus:border-cyan-500 focus:bg-yellow-500/50 transition-all" />

                  </div>
                </div>

                <hr />

                {/* Botões */}
                <div className="flex flex-col md:flex-row justify-center gap-6">

                  <button
                    type="submit"
                    className="w-64 h-15 bg-cyan-950 border-2 border-cyan-500 text-xl text-cyan-500 rounded-xl font-bold transition-all duration-200 hover:bg-cyan-700 hover:text-cyan-950 hover:scale-105 active:bg-cyan-500 active:scale-95" >
                    Salvar<br />
                    Alterações
                  </button>

                  <button
                    type="button"
                    onClick={() => setModoEdicao(false)}
                    className="w-64 h-15 bg-cyan-950 border-2 border-cyan-500 text-xl text-cyan-500 rounded-xl font-bold transition-all duration-200 hover:bg-gray-700 hover:text-white hover:scale-105 active:bg-gray-500 active:scale-95" >
                    Cancelar
                  </button>

                </div>
              </form>

            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default BttnUsuario