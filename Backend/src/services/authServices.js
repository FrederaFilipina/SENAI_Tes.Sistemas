import { buscarUsuario } from '../repositories/authRepository.js'

export async function loginService({ usuario, senha }) {
    if (!usuario || !senha) {
        throw new Error('Usuário e senha são obrigatórios')
    }

    const morador = await buscarUsuario(usuario)

    if (!morador) {
        throw new Error('Usuário não encontrado')
    }

    if (morador.senha !== senha) {
        throw new Error('Senha inválida')
    }

    // Retornar apenas os dados essenciais
    return {
        id: morador.id,
        usuario: morador.usuario
    }
}
