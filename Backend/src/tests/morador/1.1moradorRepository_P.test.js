import { jest } from '@jest/globals'

jest.unstable_mockModule('../../config/db.js', () => ({
  pool: { query: jest.fn() }
}))


const { pool } = await import('../../config/db.js')
const {criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador} = await import('../../repositories/moradoresRepository.js')

describe('moradoresRepository - positivos', () => {
  it('criarMorador deve retornar o morador criado', async () => {
    const mockMorador = { id: 1, nome: 'João', bloco: 'A', num_ap: 101, usuario: 'joao', senha: '123' }
    pool.query.mockResolvedValueOnce({ rows: [mockMorador] })

    const result = await criarMorador(mockMorador)
    expect(result).toEqual(mockMorador)
  })

  it('listarMoradores deve retornar lista de moradores', async () => {
    const mockLista = [{ id: 1, nome: 'João' }, { id: 2, nome: 'Maria' }]
    pool.query.mockResolvedValueOnce({ rows: mockLista })

    const result = await listarMoradores()
    expect(result).toEqual(mockLista)
  })

  it('buscarMoradorPorId deve retornar o morador correto', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    pool.query.mockResolvedValueOnce({ rows: [mockMorador] })

    const result = await buscarMoradorPorId(1)
    expect(result).toEqual(mockMorador)
  })

  it('atualizarMorador deve retornar o morador atualizado', async () => {
    const mockMorador = { id: 1, nome: 'João Atualizado' }
    pool.query.mockResolvedValueOnce({ rows: [mockMorador] })

    const result = await atualizarMorador(1, mockMorador)
    expect(result).toEqual(mockMorador)
  })

  it('deletarMorador deve retornar o morador deletado', async () => {
    const mockMorador = { id: 1, nome: 'João' }
    pool.query.mockResolvedValueOnce({ rows: [mockMorador] })

    const result = await deletarMorador(1)
    expect(result).toEqual(mockMorador)
  })
})
