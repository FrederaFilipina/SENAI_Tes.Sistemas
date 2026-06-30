import { criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado } from '../repositories/recadosRepository.js'

// Criar recado (sem status)
export async function createRecadoService({ responsavel, tipo_recado, recado }) {
    if (!responsavel || !tipo_recado || !recado) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos')
    }

    const novoRecado = await criarRecado({ responsavel, tipo_recado, recado })
    return novoRecado
}

// Listar recados
export async function getRecadosService() {
    return await listarRecados()
}

// Buscar recado por ID
export async function getRecadoByIdService(id) {
    const recado = await buscarRecadoPorId(id)
    if (!recado) {
        throw new Error('Recado não encontrado')
    }
    return recado
}

// Atualizar recado (parcial, sem status)
export async function updateRecadoService(id, campos) {
    const recadoExistente = await buscarRecadoPorId(id)
    if (!recadoExistente) {
        throw new Error('Recado não encontrado')
    }

    const recadoAtualizado = await atualizarRecado(id, campos)
    return recadoAtualizado
}

// Deletar recado
export async function deleteRecadoService(id) {
    const recadoExistente = await buscarRecadoPorId(id)
    if (!recadoExistente) {
        throw new Error('Recado não encontrado')
    }

    const recadoDeletado = await deletarRecado(id)
    return recadoDeletado
}
