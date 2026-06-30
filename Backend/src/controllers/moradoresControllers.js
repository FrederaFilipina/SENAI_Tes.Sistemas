import { createMoradorService, getMoradoresService, getMoradorByIdService, updateMoradorService, deleteMoradorService } from '../services/moradoresServices.js'

export async function createMorador(req, res) {
    try {
        const { nome, bloco, num_ap, usuario, senha } = req.body
        const novoMorador = await createMoradorService({ nome, bloco, num_ap, usuario, senha })

        return res.status(201).json({
            message: 'Morador criado com sucesso',
            morador: novoMorador
        })
    } catch (error) {
        console.error('ERRO CREATE MORADOR:', error)
        return res.status(400).json({ message: error.message })
    }
}

export async function getMoradores(req, res) {
    try {
        const moradores = await getMoradoresService()
        return res.status(200).json(moradores)
    } catch (error) {
        console.error('ERRO GET MORADORES:', error)
        return res.status(500).json({ message: error.message })
    }
}

export async function getMoradorById(req, res) {
    try {
        const { id } = req.params
        const morador = await getMoradorByIdService(id)
        return res.status(200).json(morador)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function updateMorador(req, res) {
    try {
        const { id } = req.params
        const { nome, bloco, num_ap, usuario } = req.body

        const moradorAtualizado = await updateMoradorService(id, { nome, bloco, num_ap, usuario })

        return res.status(200).json({
            message: 'Morador atualizado com sucesso',
            morador: moradorAtualizado
        })
    } catch (error) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ message: error.message })
        }
        return res.status(400).json({ message: error.message })
    }
}

export async function removeMorador(req, res) {
    try {
        const { id } = req.params
        const moradorDeletado = await deleteMoradorService(id)

        return res.status(200).json({
            message: 'Morador removido com sucesso',
            morador: moradorDeletado
        })
    } catch (error) {
        if (error.message.includes('não encontrado')) {
            return res.status(404).json({ message: error.message })
        }
        return res.status(500).json({ message: error.message })
    }
}
