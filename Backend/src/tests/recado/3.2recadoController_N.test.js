import { jest } from '@jest/globals'
jest.unstable_mockModule('../../services/recadosServices.js', () => ({ createRecadoService: jest.fn(), getRecadosService: jest.fn(), getRecadoByIdService: jest.fn(), updateRecadoService: jest.fn(), deleteRecadoService: jest.fn() }))

const { createRecadoService, getRecadosService, getRecadoByIdService, updateRecadoService, deleteRecadoService } = await import('../../services/recadosServices.js')
const { createRecado, getRecados, getRecadoById, updateRecado, removeRecado } = await import('../../controllers/recadosControllers.js')

function mockResponse() { return { status: jest.fn().mockReturnThis(), json: jest.fn() } }

describe('recadosControllers - negativos', () => {
  it('createRecado deve retornar 400 em caso de erro', async () => {
    const req = { body: { responsavel: 'Síndico' } }
    const res = mockResponse()

    createRecadoService.mockRejectedValueOnce(new Error('Todos os campos obrigatórios devem ser preenchidos'))

    await createRecado(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos obrigatórios devem ser preenchidos' })
  })

  it('getRecados deve retornar 500 em caso de erro', async () => {
    const req = {}
    const res = mockResponse()

    getRecadosService.mockRejectedValueOnce(new Error('Erro inesperado'))

    await getRecados(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro inesperado' })
  })

  it('getRecadoById deve retornar 404 se recado não encontrado', async () => {
    const req = { params: { id: 999 } }
    const res = mockResponse()

    getRecadoByIdService.mockRejectedValueOnce(new Error('Recado não encontrado'))

    await getRecadoById(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Recado não encontrado' })
  })

  it('updateRecado deve retornar 400 em caso de erro', async () => {
    const req = { params: { id: 1 }, body: { recado: 'Teste' } }
    const res = mockResponse()

    updateRecadoService.mockRejectedValueOnce(new Error('Erro ao atualizar'))

    await updateRecado(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao atualizar' })
  })

  it('removeRecado deve retornar 404 se recado não encontrado', async () => {
    const req = { params: { id: 999 } }
    const res = mockResponse()

    deleteRecadoService.mockRejectedValueOnce(new Error('Recado não encontrado'))

    await removeRecado(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Recado não encontrado' })
  })
})
