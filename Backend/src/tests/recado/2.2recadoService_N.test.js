import { jest } from '@jest/globals'
jest.unstable_mockModule('../../repositories/recadosRepository.js', () => ({ criarRecado: jest.fn(), listarRecados: jest.fn(), buscarRecadoPorId: jest.fn(), atualizarRecado: jest.fn(), deletarRecado: jest.fn() }))

const { criarRecado, buscarRecadoPorId, atualizarRecado, deletarRecado } = await import('../../repositories/recadosRepository.js')

const { createRecadoService, getRecadoByIdService, updateRecadoService, deleteRecadoService } = await import('../../services/recadosServices.js')

describe('recadosServices - negativos', () => {
  it('createRecadoService deve lançar erro se campos obrigatórios faltarem', async () => {
    await expect(createRecadoService({ responsavel: 'Síndico' }))
      .rejects
      .toThrow('Todos os campos obrigatórios devem ser preenchidos')
  })

  it('getRecadoByIdService deve lançar erro se recado não existir', async () => {
    buscarRecadoPorId.mockResolvedValueOnce(null)

    await expect(getRecadoByIdService(999))
      .rejects
      .toThrow('Recado não encontrado')
  })

  it('updateRecadoService deve lançar erro se recado não existir', async () => {
    buscarRecadoPorId.mockResolvedValueOnce(null)

    await expect(updateRecadoService(999, { recado: 'Teste' }))
      .rejects
      .toThrow('Recado não encontrado')
  })

  it('deleteRecadoService deve lançar erro se recado não existir', async () => {
    buscarRecadoPorId.mockResolvedValueOnce(null)

    await expect(deleteRecadoService(999))
      .rejects
      .toThrow('Recado não encontrado')
  })
})
