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

describe('moradoresController - positivos', () => {
  it('createMorador deve retornar 201 e morador criado', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    createMoradorService.mockResolvedValueOnce(mockMorador)

    const req = { body: mockMorador }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await createMorador(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Morador criado com sucesso',
      morador: mockMorador
    })
  })

  it('getMoradores deve retornar 200 e lista de moradores', async () => {
    const mockLista = [{ id: 1, nome: 'João' }]
    getMoradoresService.mockResolvedValueOnce(mockLista)

    const req = {}
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await getMoradores(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockLista)
  })

  it('getMoradorById deve retornar 200 e morador', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    getMoradorByIdService.mockResolvedValueOnce(mockMorador)

    const req = { params: { id: 1 } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await getMoradorById(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockMorador)
  })

  it('updateMorador deve retornar 200 e morador atualizado', async () => {
    const mockMorador = { id: 1, nome: 'João Atualizado' }
    updateMoradorService.mockResolvedValueOnce(mockMorador)

    const req = { params: { id: 1 }, body: mockMorador }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await updateMorador(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Morador atualizado com sucesso',
      morador: mockMorador
    })
  })

  it('removeMorador deve retornar 200 e morador removido', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    deleteMoradorService.mockResolvedValueOnce(mockMorador)

    const req = { params: { id: 1 } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await removeMorador(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Morador removido com sucesso',
      morador: mockMorador
    })
  })
})
