import { jest } from '@jest/globals'

jest.unstable_mockModule('../../services/moradoresServices.js', () => ({
  createMoradorService: jest.fn(),
  getMoradoresService: jest.fn(),
  getMoradorByIdService: jest.fn(),
  updateMoradorService: jest.fn(),
  deleteMoradorService: jest.fn()
}))

const { createMoradorService, getMoradoresService, getMoradorByIdService, updateMoradorService, deleteMoradorService } = await import('../../services/moradoresServices.js')

const { createMorador, getMoradores, getMoradorById, updateMorador, removeMorador } = await import('../../controllers/moradoresControllers.js')

describe('moradoresController - negativos', () => {
  it('createMorador deve retornar 400 em erro de service', async () => {
    createMoradorService.mockRejectedValueOnce(new Error('Todos os campos são obrigatórios'))

    const req = { body: {} }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await createMorador(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios' })
  })

  it('getMoradores deve retornar 500 em erro de service', async () => {
    getMoradoresService.mockRejectedValueOnce(new Error('Falha no banco'))

    const req = {}
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await getMoradores(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Falha no banco' })
  })

  it('getMoradorById deve retornar 404 em erro de service', async () => {
    getMoradorByIdService.mockRejectedValueOnce(new Error('Morador não encontrado'))

    const req = { params: { id: 99 } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await getMoradorById(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Morador não encontrado' })
  })

  it('updateMorador deve retornar 404 quando morador não encontrado', async () => {
    updateMoradorService.mockRejectedValueOnce(new Error('Morador não encontrado para atualização'))

    const req = { params: { id: 99 }, body: { nome: 'Teste', bloco: 'A', num_ap: 101, usuario: 'teste' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await updateMorador(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Morador não encontrado para atualização' })
  })

  it('removeMorador deve retornar 404 quando morador não encontrado', async () => {
    deleteMoradorService.mockRejectedValueOnce(new Error('Morador não encontrado para exclusão'))

    const req = { params: { id: 99 } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await removeMorador(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Morador não encontrado para exclusão' })
  })
})
