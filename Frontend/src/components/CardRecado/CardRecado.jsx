import { FaUserAstronaut } from "react-icons/fa6";

function CardRecado({ recado, nomeUsuario, bloco, num_ap, editando, textoEditado, setTextoEditado, onEditar, onSalvar, onExcluir, onCancelar, mostrarAcoes }) {

  const modoEdicao = mostrarAcoes && editando === recado.id

  console.log('CARD', { recadoId: recado.id, tipoRecadoId: typeof recado.id, editando, tipoEditando: typeof editando, modoEdicao })

  return (

    <div className="bg-cyan-950 rounded-3xl border-2 border-amber-500 p-5">

      {/* Cabeçalho */}
      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div className="w-15 h-15 rounded-full bg-cyan-800 flex items-center justify-center border-2 border-white">
            <span>
              <FaUserAstronaut size={40} className="text-white -translate-y-1" />
            </span>
          </div>

          <div>

            <h3 className="text-3xl text-cyan-500 font-medium">
              {nomeUsuario}
            </h3>

          </div>

        </div>

        <span className="px-3 py-1 rounded-full text-1lg font-semibold bg-cyan-900 text-yellow-300"
        >
          {recado.tipo_recado}
        </span>


      </div>

      {/* Conteúdo */}
      <div className="mt-8">

        {editando === recado.id ? (

          <textarea value={textoEditado} onChange={(e) => setTextoEditado(e.target.value)}
            className="w-full min-h-[120px] p-4 border-2 border-amber-500 rounded-xl focus:border-cyan-500 focus:bg-yellow-500/50 transition-all text-white"
          />

        ) : (

          <p className="min-h-[120px] border-2 border-cyan-900 rounded-2xl p-4 text-2xl text-white leading-relaxed">
            {recado.recado}
          </p>

        )}

      </div>

      {/* Linha */}
      <hr className="my-8 border-gray-300" />

      {/* Rodapé */}
      <div className="flex justify-between items-center">

        <span className="text-white/25">
          {new Date(recado.criado).toLocaleDateString(
            "pt-BR",{ day: "2-digit", month: "short", year: "numeric" })}
        </span>

        {mostrarAcoes && (
          <div className="flex gap-3">
            {editando === recado.id ? (
              <>
                <button onClick={() => onSalvar(recado.id)}
                  className="px-4 py-2 rounded-xl bg-green-600 text-white"
                >
                  Salvar
                </button>

                <button onClick={onCancelar}
                  className="px-4 py-2 rounded-xl bg-gray-500 text-white"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onEditar(recado)}
                  className="px-4 py-2 rounded-xl bg-cyan-700 text-white"
                >
                  Editar
                </button>

                <button onClick={() => onExcluir(recado.id)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        )}

      </div>


    </div>
  )
}

export default CardRecado