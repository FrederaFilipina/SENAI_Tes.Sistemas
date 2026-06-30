import { criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador } from '../repositories/moradoresRepository.js'

export async function createMoradorService({ nome, bloco, num_ap, usuario, senha }) {
    if (!nome || !bloco || !num_ap || !usuario || !senha) {
        throw new Error('Todos os campos são obrigatórios')
    }

    try {
        const novoMorador = await criarMorador({ nome, bloco, num_ap, usuario, senha })
        return novoMorador

    } catch (error) {
        throw new Error('Erro ao criar morador: ' + error.message)
    }
}


export async function getMoradoresService() {
    try {
        const moradores = await listarMoradores()
        return moradores

    } catch (error) {
        throw new Error('Erro ao listar moradores: ' + error.message)
    }
}


export async function getMoradorByIdService(id) {
    try {
        const morador = await buscarMoradorPorId(id)
        if (!morador) {
            throw new Error('Morador não encontrado')
        }
        return morador

    } catch (error) {
        throw new Error('Erro ao buscar morador: ' + error.message)
    }
}


export async function updateMoradorService(id, { nome, bloco, num_ap, usuario }) {
    if (!nome || !bloco || !num_ap || !usuario) {
        throw new Error('Todos os campos são obrigatórios')
    }

    try {
        const moradorAtualizado = await atualizarMorador(id, { nome, bloco, num_ap, usuario })
        if (!moradorAtualizado) {
            throw new Error('Morador não encontrado para atualização')
        }
        return moradorAtualizado

    } catch (error) {
        throw new Error('Erro ao atualizar morador: ' + error.message)
    }
}


export async function deleteMoradorService(id) {
    try {
        const moradorDeletado = await deletarMorador(id)
        if (!moradorDeletado) {
            throw new Error('Morador não encontrado para exclusão')
        }
        return moradorDeletado

    } catch (error) {
        throw new Error('Erro ao deletar morador: ' + error.message)
    }
}