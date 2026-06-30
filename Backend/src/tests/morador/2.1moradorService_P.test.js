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

describe('moradoresServices - positivos', () => {
  it('createMoradorService deve criar morador com sucesso', async () => {
    const mockMorador = { id: 1, nome: 'João Atualizado', bloco: 'A', num_ap: 101, usuario: 'joao' }
    atualizarMorador.mockResolvedValueOnce(mockMorador)

    const result = await updateMoradorService(1, mockMorador)
    expect(result).toEqual(mockMorador)

  })

  it('getMoradoresService deve retornar lista de moradores', async () => {
    const mockLista = [{ id: 1, nome: 'João' }, { id: 2, nome: 'Maria' }]
    listarMoradores.mockResolvedValueOnce(mockLista)

    const result = await getMoradoresService()
    expect(result).toEqual(mockLista)
  })

  it('getMoradorByIdService deve retornar morador pelo id', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    buscarMoradorPorId.mockResolvedValueOnce(mockMorador)

    const result = await getMoradorByIdService(1)
    expect(result).toEqual(mockMorador)
  })

  it('updateMoradorService deve atualizar morador com sucesso', async () => {
    const mockMorador = {
      id: 1,
      nome: 'João Atualizado',
      bloco: 'A',
      num_ap: 101,
      usuario: 'joao'
    }

    atualizarMorador.mockResolvedValueOnce(mockMorador)

    const result = await updateMoradorService(1, {
      nome: mockMorador.nome,
      bloco: mockMorador.bloco,
      num_ap: mockMorador.num_ap,
      usuario: mockMorador.usuario
    })

    expect(result).toEqual(mockMorador)
  })


  it('deleteMoradorService deve deletar morador com sucesso', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    deletarMorador.mockResolvedValueOnce(mockMorador)

    const result = await deleteMoradorService(1)
    expect(result).toEqual(mockMorador)
  })
})
