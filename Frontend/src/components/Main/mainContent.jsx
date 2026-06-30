import SideBar from "../Sidebar/sideBar"


function MainContent({ children, setPaginaAtual, paginaAtual }) {

  return (

    <div className="flex h-screen">

      {/* Espaço reservado para a sidebar */}
      <div className="w-64 shrink-0">
        <SideBar
          setPaginaAtual={setPaginaAtual}
          paginaAtual={paginaAtual}
        />
      </div>

      {/* Conteúdo */}
      <main className="flex-1 h-screen p-8 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 overflow-auto">
        {children}
      </main>

    </div>
  )
}

export default MainContent