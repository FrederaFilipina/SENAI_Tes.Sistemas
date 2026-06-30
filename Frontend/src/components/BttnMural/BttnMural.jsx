import { useEffect, useState } from "react"
import minhaSA from "../../service/minhaSA"

import CardRecado from "../../components/CardRecado/CardRecado"

function BttnMural() {

  const [recados, setRecados] = useState([])
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {

    async function carregarDados() {

      try {

        // 🔵 busca usuários
        const usuariosRes =
          await minhaSA.get("/moradores")

        // 🔵 busca recados
        const recadosRes =
          await minhaSA.get("/recados")

        // 🔵 ordena do mais novo para o mais antigo
        const recadosOrdenados =
          recadosRes.data.sort(
            (a, b) =>
              new Date(b.criado) -
              new Date(a.criado)
          )

        setUsuarios(usuariosRes.data)
        setRecados(recadosOrdenados)

      } catch (error) {

        console.error(
          "❌ ERRO AO CARREGAR MURAL:",
          error
        )
      }
    }

    carregarDados()

  }, [])

  // 🔵 função para achar nome do usuário
  function getNomeUsuario(id) {

    const usuario = usuarios.find(
      (u) => String(u.id) === String(id)
    )

    return usuario?.nome || "Desconhecido"
  }

  return (

    <div
      className="grid grid-cols-1
                 md:grid-cols-2 gap-6"
    >

      {recados.length === 0 ? (

        <p className="text-gray-500">
          Nenhum recado no mural
        </p>

      ) : (

        recados.map((recado) => (

          <CardRecado
            key={recado.id}
            recado={recado}
            nomeUsuario={
              getNomeUsuario(
                recado.responsavel
              )
            }
            mostrarAcoes={false}
          />

        ))

      )}

    </div>
  )
}

export default BttnMural