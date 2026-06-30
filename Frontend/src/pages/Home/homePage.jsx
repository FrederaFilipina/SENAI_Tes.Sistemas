import { useState } from "react";
import FormLogin from "../../components/Form/formLogin";
import FormRegister from "../../components/Form/formRegister";
import iconImg from "../../assets/iconImg.png";
import Img from "../../assets/Img.jpg"
import { FaRegBuilding } from "react-icons/fa";
import { MdMessage } from "react-icons/md";


function HomePage() {

  const [tela, setTela] = useState("home")

  return (
    <main className="flex h-screen w-full overflow-hidden">

      {/* Esquerda */}
      <section className="w-[45%] bg-gradient-to-br from-cyan-950 to-cyan-700 flex items-center justify-center px-10 relative overflow-hidden">

        <div className="z-10 max-w-xl">

          <h1 className="text-7xl font-bold text-yellow-400 mb-5">
            Mural <span className="text-white">Condômino</span>
          </h1>

          <p className="text-lg text-yellow-400/85 mb-4">
            Centralize recados, avisos e comunicados do seu condomínio em um único lugar.
            Mais praticidade, transparência e conexão para o dia a dia dos moradores.
          </p>

          <img src={Img} alt="Condomínio"
            className="absolute right-[10%] top-[90%] -translate-y-1/2 translate-x-1/2 w-75 h-75 object-cover rounded-full opacity-50"
          />

        </div>

      </section>

      {/* Direita */}
      <section className="w-[55%] bg-gray-100 flex flex-col">

        {/* Dir - Sup */}
        <div className="h-[40%] flex flex-col items-center justify-center px-5">

          <img
            src={iconImg}
            alt="Condomínio"
            className="w-95 h-95 object-contain"
          />

          <h2 className="text-4xl font-bold text-cyan-950 mt-3">
            {tela === "home" ? "Sinta-se em casa." : ""}
            {tela === "login" ? "e lembre-se de limpar os calçados!" : ""}
            {tela === "register" ? "É muito bom ter você aqui!" : ""}
          </h2>

        </div>

        {/* Dir - Inf*/}
        <div className="h-[60%] flex items-center justify-center px-10">

          <div className="w-full max-w-sm">

            {tela === "home" && (
              <div className="flex flex-col gap-4">

                <button
                  onClick={() => setTela("login")}
                  className="w-full h-15 bg-cyan-950 text-2xl text-white rounded-xl font-bold cursor-pointer transition-all duration-200 hover:bg-cyan-700 hover:scale-105 active:bg-cyan-500 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Entrar</span>
                </button>

                <button
                  onClick={() => setTela("register")}
                  className="w-full h-15 bg-cyan-950 text-2xl text-yellow-400 rounded-xl font-bold cursor-pointer transition-all duration-200 hover:bg-cyan-700 hover:scale-105 active:bg-cyan-500 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Cadastre-se</span>
                </button>

              </div>
            )}

            {tela === "login" && (
              <FormLogin Voltar={() => setTela("home")} 
              irCadastro={() => setTela("register")}/>
              
            )}

            {tela === "register" && (
              <FormRegister Voltar={() => setTela("home")} />
            )}

          </div>

        </div>

      </section>

    </main>
  )
}

export default HomePage

