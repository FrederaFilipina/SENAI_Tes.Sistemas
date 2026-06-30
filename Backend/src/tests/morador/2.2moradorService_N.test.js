import { jest } from '@jest/globals'

jest.unstable_mockModule('../../repositories/moradoresRepository.js', () => ({
  criarMorador: jest.fn(),
  listarMoradores: jest.fn(),
  buscarMoradorPorId: jest.fn(),
  atualizarMorador: jest.fn(),
  deletarMorador: jest.fn()
}))

const { criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador } = await import('../../repositories/moradoresRepository.js')

const { createMoradorService, getMoradoresService, getMoradorByIdService, updateMoradorService, deleteMoradorService } = await import('../../services/moradoresServices.js')

describe('moradoresServices - negativos', () => {
  it('createMoradorService deve lançar erro se faltar campos obrigatórios', async () => {
    await expect(createMoradorService({ nome: 'João' }))
      .rejects.toThrow('Todos os campos são obrigatórios')
  })

  it('createMoradorService deve lançar erro se repository falhar', async () => {
    criarMorador.mockRejectedValueOnce(new Error('Falha no banco'))
    await expect(createMoradorService({ nome: 'João', bloco: 'A', num_ap: 101, usuario: 'joao', senha: '123' }))
      .rejects.toThrow('Erro ao criar morador: Falha no banco')
  })

  it('getMoradoresService deve lançar erro se repository falhar', async () => {
    listarMoradores.mockRejectedValueOnce(new Error('Falha no banco'))
    await expect(getMoradoresService())
      .rejects.toThrow('Erro ao listar moradores: Falha no banco')
  })

  it('getMoradorByIdService deve lançar erro se não encontrar morador', async () => {
    buscarMoradorPorId.mockResolvedValueOnce(null)
    await expect(getMoradorByIdService(99))
      .rejects.toThrow('Morador não encontrado')
  })

  it('updateMoradorService deve lançar erro se faltar campos obrigatórios', async () => {
    await expect(updateMoradorService(1, { nome: 'João' }))
      .rejects.toThrow('Todos os campos são obrigatórios')
  })

  it('updateMoradorService deve lançar erro se repository falhar', async () => {
    atualizarMorador.mockRejectedValueOnce(new Error('Falha no banco'))
    await expect(updateMoradorService(1, { nome: 'João', bloco: 'A', num_ap: 101, usuario: 'joao' }))
      .rejects.toThrow('Erro ao atualizar morador: Falha no banco')
  })

  it('deleteMoradorService deve lançar erro se repository falhar', async () => {
    deletarMorador.mockRejectedValueOnce(new Error('Falha no banco'))
    await expect(deleteMoradorService(1))
      .rejects.toThrow('Erro ao deletar morador: Falha no banco')
  })
})
