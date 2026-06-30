import { useState } from 'react'
import { toast } from 'react-toastify'
import minhaSA from '../../service/minhaSA'

function CadastroForm() {

  const [nome, setNome] = useState('')
  const [bloco, setBloco] = useState('')
  const [num_ap, setNumAp] = useState('')
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  async function handleCadastro(e) {

    e.preventDefault()

    try {

      // Validação do bloco
      if (!['A', 'B'].includes(bloco)) {
        toast.error('O bloco deve ser A ou B')
        return
      }

      // Validação do apartamento
      const apartamentoValido =
        /^[1-4]0[1-8]$/.test(num_ap) ||
        /^50[1-2]$/.test(num_ap)

      if (!apartamentoValido) {
        toast.error(
          'Apartamento inválido. Utilize números entre 101-108, 201-208, 301-308, 401-408, 501 ou 502.'
        )
        return
      }

      const response = await minhaSA.get('/usuarios')

      const usuariosSalvos = response.data

      const usuarioExiste = usuariosSalvos.find(
        u => u.usuario === usuario
      )

      if (usuarioExiste) {
        toast.error('Usuário já existe')
        return
      }

      const novoUsuario = {
        nome,
        bloco,
        num_ap,
        usuario,
        senha
      }

      await minhaSA.post('/usuarios', novoUsuario)

      toast.success('Usuário cadastrado com sucesso')

      setNome('')
      setBloco('')
      setNumAp('')
      setUsuario('')
      setSenha('')

    } catch (error) {

      console.error(error)

      toast.error('Erro ao cadastrar usuário')
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Cadastre-se
      </h2>

      <p className="text-center text-gray-500 text-sm mb-6">
        Morador novo? Crie sua conta para acessar o mural de recados.
      </p>

      <form onSubmit={handleCadastro} className="flex flex-col gap-5">

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Morador:</label>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Bloco:</label>

          <select
            value={bloco}
            onChange={(e) => setBloco(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white
                       outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            required
          >
            <option value="">Selecione o bloco</option>
            <option value="A">Bloco A</option>
            <option value="B">Bloco B</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Apartamento:</label>

          <input
            type="text"
            maxLength={3}
            placeholder="Ex: 101"
            value={num_ap}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, '')
              setNumAp(valor)
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            required
          />

          <span className="text-xs text-gray-500">
            Apartamentos válidos: 101-108, 201-208, 301-308, 401-408, 501 e 502
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Usuário:</label>

          <input
            type="text"
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Senha:</label>

          <input
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none
                       focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.99]
                     text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Cadastrar
        </button>

      </form>

    </div>
  )
}

export default CadastroForm