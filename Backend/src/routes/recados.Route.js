import { Router } from 'express'
import { createRecado, getRecados, getRecadoById,
updateRecado, removeRecado } from '../controllers/recadosControllers.js'

const router = Router()

router.post('/recados', createRecado)
router.get('/recados', getRecados)
router.get('/recados/:id', getRecadoById)
router.put('/recados/:id', updateRecado)
router.delete('/recados/:id', removeRecado)

export default router