import { jest } from '@jest/globals'
jest.unstable_mockModule('../../services/recadosServices.js', () => ({ createRecadoService: jest.fn(), getRecadosService: jest.fn(), getRecadoByIdService: jest.fn(), updateRecadoService: jest.fn(), deleteRecadoService: jest.fn() }))

const { createRecadoService, getRecadosService, getRecadoByIdService, updateRecadoService, deleteRecadoService } = await import('../../services/recadosServices.js')
const { createRecado, getRecados, getRecadoById, updateRecado, removeRecado } = await import('../../controllers/recadosControllers.js')

function mockResponse() { return { status: jest.fn().mockReturnThis(), json: jest.fn() } }

describe('recadosControllers - positivos', () => {
  it('createRecado deve retornar 201 e recado criado', async () => {
    const req = { body: { responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' } }
    const res = mockResponse()
    const mockRecado = { id: 1, ...req.body }

    createRecadoService.mockResolvedValueOnce(mockRecado)

    await createRecado(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: 'Recado criado com sucesso', recado: mockRecado })
  })

  it('getRecados deve retornar 200 e lista de recados', async () => {
    const req = {}
    const res = mockResponse()
    const mockLista = [{ id: 1 }, { id: 2 }]

    getRecadosService.mockResolvedValueOnce(mockLista)

    await getRecados(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockLista)
  })

  it('getRecadoById deve retornar 200 e recado pelo ID', async () => {
    const req = { params: { id: 1 } }
    const res = mockResponse()
    const mockRecado = { id: 1, recado: 'Teste' }

    getRecadoByIdService.mockResolvedValueOnce(mockRecado)

    await getRecadoById(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockRecado)
  })

  it('updateRecado deve retornar 200 e recado atualizado', async () => {
    const req = { params: { id: 1 }, body: { recado: 'Atualizado' } }
    const res = mockResponse()
    const mockRecado = { id: 1, recado: 'Atualizado' }

    updateRecadoService.mockResolvedValueOnce(mockRecado)

    await updateRecado(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Recado atualizado com sucesso',
      recado: mockRecado
    })
  })

  it('removeRecado deve retornar 200 e recado deletado', async () => {
    const req = { params: { id: 1 } }
    const res = mockResponse()
    const mockRecado = { id: 1, recado: 'Deletado' }

    deleteRecadoService.mockResolvedValueOnce(mockRecado)

    await removeRecado(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Recado removido com sucesso',
      recado: mockRecado
    })
  })
})
