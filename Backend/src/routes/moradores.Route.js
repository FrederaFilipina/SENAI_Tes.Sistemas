import { Router } from 'express'
import { createMorador, getMoradores, getMoradorById, updateMorador, removeMorador } from '../controllers/moradoresControllers.js'

const router = Router()


router.post('/moradores', createMorador)
//↪ Criar usuário de morador

router.get('/moradores', getMoradores)
//↪ Ler todo os usuários criados

router.get('/moradores/:id', getMoradorById)
//↪ Ler um único usuário

router.put('/moradores/:id', updateMorador)
//↪ Atualizar os dados de um único usuário

router.delete('/moradores/:id', removeMorador)
//↪ Deletar o úsuario de um único modador

export default router