import { useEffect, useState } from "react"
import MainContent from "../../components/Main/mainContent"
import BttnUsuario from "../../components/BttnUsuario/BttnUsuario"
import BttnMeusRecados from "../../components/BttnMeusRecados/BttnMeusRecados"
import BttnMural from "../../components/BttnMural/BttnMural"


function HomeScreen() {
  const [paginaAtual, setPaginaAtual] = useState(null)

  function alterarPagina(novaPagina) {
    setPaginaAtual(novaPagina)

    localStorage.setItem(
      "paginaAtual",
      novaPagina
    )
  }

  useEffect(() => {
    const usuarioLogado =
      localStorage.getItem("usuarioLogado")

    const paginaSalva =
      localStorage.getItem("paginaAtual")

    if (usuarioLogado) {
      if (paginaSalva) {
        setPaginaAtual(paginaSalva)
      } else {
        alterarPagina("mural")
      }
    }
  }, [])

  function renderizarPagina() {
    switch (paginaAtual) {
      case "usuario":
        return <BttnUsuario />

      case "meusRecados":
        return <BttnMeusRecados />

      case "mural":
        return <BttnMural />

      default:
        return <BttnMural />
    }
  }

  return (
    <MainContent
      paginaAtual={paginaAtual}
      setPaginaAtual={alterarPagina}
    >
      {renderizarPagina()}
    </MainContent>
  )
}

export default HomeScreen