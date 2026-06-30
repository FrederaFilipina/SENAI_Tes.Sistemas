import { PiUserListFill } from "react-icons/pi";
import { RiPushpinFill } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import { GiEntryDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function SideBar({
    setPaginaAtual,
    paginaAtual
}) {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("usuarioLogado");

        navigate("/");
    }

    function estiloBotao(nomePagina) {

        const ativo = paginaAtual === nomePagina;

        return `
            w-full h-14 flex items-center gap-3 px-4 rounded-xl border-2
            transition-all duration-200 cursor-pointer
            ${
                ativo
                    ? "bg-yellow-500 text-cyan-900 border-cyan-500"
                    : "text-cyan-300 border-transparent hover:text-cyan-500 active:text-cyan-700 active:border-cyan-500 active:bg-yellow-500"
            }
        `;
    }

    return (
        <div className="bg-background text-on-surface flex min-h-screen">

            {/* Sidebar */}
            <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 w-64 bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-900 py-6 z-50">

                <div className="px-4 mb-10 border-b border-cyan-500">
                    <h1 className="text-2xl font-bold text-yellow-400">
                        Mural Condômino
                    </h1>
                </div>

                <nav className="flex-grow space-y-7 px-2">

                    {/* PERFIL */}
                    <button
                        onClick={() => setPaginaAtual("usuario")}
                        className={estiloBotao("usuario")}
                    >
                        <PiUserListFill size={32} />

                        <span className="font-semibold text-xl leading-none">
                            Perfil
                        </span>
                    </button>

                    {/* MEUS RECADOS */}
                    <button
                        onClick={() => setPaginaAtual("meusRecados")}
                        className={estiloBotao("meusRecados")}
                    >
                        <RiPushpinFill size={32} />

                        <span className="font-semibold text-xl leading-none">
                            Meus Recados
                        </span>
                    </button>

                    {/* MURAL */}
                    <button
                        onClick={() => setPaginaAtual("mural")}
                        className={estiloBotao("mural")}
                    >
                        <LuMessagesSquare size={32} />

                        <span className="font-semibold text-xl leading-none">
                            Mural
                        </span>
                    </button>

                </nav>

                <div className="px-4 pt-6 border-t border-cyan-500">

                    <button
                        onClick={handleLogout}
                        className="w-full h-14 flex items-center justify-center gap-3 rounded-xl text-cyan-500 bg-red-500/50 border-2 border-red-500 transition-all duration-200 hover:text-white hover:bg-red-500 active:bg-red-700 active:text-white active:border-red-500"
                    >
                        <GiEntryDoor size={32} />

                        <span className="font-semibold text-xl leading-none">
                            Sair
                        </span>
                    </button>

                </div>

            </aside>

        </div>
    );
}

export default SideBar;