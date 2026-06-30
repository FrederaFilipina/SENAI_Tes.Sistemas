import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import minhaSA from "../../service/minhaSA"
import { PiPencilLine } from "react-icons/pi"

import CardRecado from "../../components/CardRecado/CardRecado"

function BttnMeusRecados() {

  const usuarioLogado = JSON.parse( localStorage.getItem("usuarioLogado") )
  const [recados, setRecados] = useState([])
  const [editando, setEditando] = useState(null)
  const [textoEditado, setTextoEditado] = useState("")
  const [novoRecado, setNovoRecado] = useState("")
  const [novoTipo, setNovoTipo] = useState("Aviso")

  console.log('ESTADO ATUAL', { editando, tipoEditando: typeof editando })
  useEffect(() => {

    async function carregarRecados() {

      try {

        const response = await minhaSA.get("/recados")
        const filtrados = response.data
          .filter((r) => String(r.responsavel) === String(usuarioLogado.id))
          .sort((a, b) => new Date(b.criado) - new Date(a.criado))

        setRecados(filtrados)

      } catch (error) {

        console.error("❌ ERRO AO BUSCAR RECADOS:", error)
        toast.error("Erro ao carregar recados")
      }
    }

    carregarRecados()

  }, [usuarioLogado.id])

  async function handleCriarRecado() {

    if (!novoRecado.trim()) {

      toast.error("O recado não pode estar vazio")

      return
    }

    try {

      const novo = {
        responsavel: Number(usuarioLogado.id),
        tipo_recado: novoTipo,
        recado: novoRecado.trim(),
        status: "ativo",
        criado: new Date().toISOString()
      }

      const response = await minhaSA.post("/recados", novo)

      setRecados((prev) => [response.data.recado, ...prev])
      setNovoRecado("")
      setNovoTipo("Aviso")

      toast.success("Recado criado com sucesso")

    } catch (error) {

      console.error("❌ ERRO AO CRIAR RECADO:", error)
      toast.error("Erro ao criar recado")
    }
  }

  async function handleDelete(id) {

    try {

      await minhaSA.delete(`/recados/${id}`)

      setRecados((prev) => prev.filter((recado) => recado.id !== id))
      toast.success("Recado excluído com sucesso")

    } catch (error) {

      console.error("❌ ERRO AO DELETAR:", error)
      toast.error("Erro ao excluir recado")
    }
  }

  function handleEditar(recado) {

    console.log('CLICOU EDITAR', {
      id: recado.id,
      tipo: typeof recado.id
    })

    setEditando(recado.id)
    setTextoEditado( recado.recado )
  }

  function handleCancelarEdicao() {

    setEditando(null)
    setTextoEditado("")
    toast.info("Edição cancelada. O recado não foi alterado.")
  }

  async function handleSalvarEdicao(id) {

    if (!textoEditado.trim()) {

      toast.error( "O recado não pode ficar vazio" )

      return
    }

    try {

      await minhaSA.put(`/recados/${id}`,
        {
          ...recados.find((r) => r.id === id),
          recado: textoEditado.trim()
        })

      setRecados((prev) => prev.map((r) => r.id === id ? { ...r, recado: textoEditado.trim() } : r))
      setEditando(null)
      setTextoEditado("")

      toast.success("Recado atualizado com sucesso")

    } catch (error) {

      console.error("❌ ERRO AO EDITAR:", error)
      toast.error("Erro ao atualizar recado")
    }
  }

  console.log("BttnMeusRecados -> editando:", editando, typeof editando)

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-6">

      {/* Cabeçalho */}
      <header className="mb-8">

        <h1 className="text-4xl font-bold text-cyan-400">
          Gerencie o que você quer comunicar com o seu condomínio!
        </h1>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Formulário */}
        <div className="flex flex-col gap-25">

          <div className="bg-cyan-900 border-2 border-cyan-500 rounded-2xl p-6">

            <div className="space-y-5">

              <div>

                <label className="block text-sm font-medium text-white mb-2">
                  Tipo do Recado:
                </label>

                <select data-testid="tipo-recado" value={novoTipo}
                onChange={(e) => setNovoTipo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white bg-cyan-950 text-white hover:border-yellow-500 focus:outline-none focus:border-yellow-500 focus:bg-yellow-500/15 focus:text-white transition-all">

                  <option value="Aviso" className="bg-white text-black">Aviso</option>
                  <option value="Comunicado" className="bg-white text-black">Comunicado</option>
                  <option value="Ecomenda" className="bg-white text-black">Ecomenda</option>

                </select>

              </div>

              <div>

                <label className="block text-sm font-medium text-white mb-2">
                  Sua Mensagem
                </label>

                <textarea
                  data-testid="novo-recado" value={novoRecado}
                  onChange={(e) => setNovoRecado(e.target.value) }
                  placeholder="Descreva o que deseja informar ao condomínio..."
                  className="w-full px-4 py-3 rounded-xl border border-white bg-cyan-950 text-white resize-none min-h-[160px] hover:border-yellow-500 focus:outline-none focus:border-yellow-500 focus:bg-yellow-500/15 focus:text-white transition-all"/>

              </div>

              <button
                data-testid="btn-criar-recado"
                onClick={handleCriarRecado}
                className="w-full py-4 bg-cyan-950 text-white rounded-xl font-bold border-cyan-500 border-2 cursor-pointer transition-all duration-200 hover:bg-green-700 hover:scale-105 active:bg-green-500 active:scale-95 flex items-center justify-center gap-2"
              >
                <PiPencilLine size={25} />
                Criar Recado
              </button>

            </div>

          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-6">

            <h2 className="text-3xl text-yellow-500 font-semibold">
              Recados Ativos:
            </h2>

            <span className="text-yellow-500 text-4xl font-bold">
              {recados.length}
            </span>

          </div>

        </div>

        {/* Lista de Recados */}
        <div className="lg:col-span-2">

          <div className="space-y-5">

            {recados.length === 0 ? (

              <div className="bg-cyan-900 border-2 border-cyan-500 rounded-2xl p-8">

                <p className="text-cyan-200 text-center">
                  Nenhum recado encontrado.
                </p>

              </div>

            ) : (

              recados.map((recado) => (

                <div
                  key={recado.id}
                  data-testid={`recado-${recado.id}`}>

                  <CardRecado
                    recado={recado}
                    nomeUsuario={usuarioLogado.nome}
                    bloco={usuarioLogado.bloco}
                    num_ap={usuarioLogado.num_ap}
                    editando={editando}
                    textoEditado={textoEditado}
                    setTextoEditado={setTextoEditado}
                    onEditar={handleEditar}
                    onSalvar={handleSalvarEdicao}
                    onExcluir={handleDelete}
                    onCancelar={handleCancelarEdicao}
                    mostrarAcoes={true}
                  />

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  )
}

export default BttnMeusRecados