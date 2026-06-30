import { jest } from '@jest/globals'
jest.unstable_mockModule('../../repositories/recadosRepository.js', () => ({ criarRecado: jest.fn(), listarRecados: jest.fn(), buscarRecadoPorId: jest.fn(), atualizarRecado: jest.fn(), deletarRecado: jest.fn() }))

const { criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado } = await import('../../repositories/recadosRepository.js')
const { createRecadoService, getRecadosService, getRecadoByIdService, updateRecadoService, deleteRecadoService } = await import('../../services/recadosServices.js')

describe('recadosServices - positivos', () => {
  it('createRecadoService deve criar e retornar recado', async () => {
    const mockRecado = { id: 1, responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' }
    criarRecado.mockResolvedValueOnce(mockRecado)

    const result = await createRecadoService(mockRecado)
    expect(result).toEqual(mockRecado)
  })

  it('getRecadosService deve retornar lista de recados', async () => {
    const mockLista = [{ id: 1 }, { id: 2 }]
    listarRecados.mockResolvedValueOnce(mockLista)

    const result = await getRecadosService()
    expect(result).toEqual(mockLista)
  })

  it('getRecadoByIdService deve retornar recado pelo ID', async () => {
    const mockRecado = { id: 1, recado: 'Teste' }
    buscarRecadoPorId.mockResolvedValueOnce(mockRecado)

    const result = await getRecadoByIdService(1)
    expect(result).toEqual(mockRecado)
  })

  it('updateRecadoService deve atualizar e retornar recado', async () => {
    const mockRecado = { id: 1, recado: 'Atualizado' }
    buscarRecadoPorId.mockResolvedValueOnce(mockRecado)
    atualizarRecado.mockResolvedValueOnce(mockRecado)

    const result = await updateRecadoService(1, { recado: 'Atualizado' })
    expect(result).toEqual(mockRecado)
  })

  it('deleteRecadoService deve deletar e retornar recado', async () => {
    const mockRecado = { id: 1, recado: 'Deletado' }
    buscarRecadoPorId.mockResolvedValueOnce(mockRecado)
    deletarRecado.mockResolvedValueOnce(mockRecado)

    const result = await deleteRecadoService(1)
    expect(result).toEqual(mockRecado)
  })
})
