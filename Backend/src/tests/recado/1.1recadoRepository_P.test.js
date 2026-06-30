import { jest } from '@jest/globals'
jest.unstable_mockModule('../../config/db.js', () => ({ pool: { query: jest.fn() } }))

const { pool } = await import('../../config/db.js')
const { criarRecado, listarRecados, buscarRecadoPorId, atualizarRecado, deletarRecado } = await import('../../repositories/recadosRepository.js')

describe('recadosRepository - positivos', () => {
  it('criarRecado deve retornar o recado criado', async () => {
    const mockRecado = { id: 1, responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' }
    pool.query.mockResolvedValueOnce({ rows: [mockRecado] })

    const result = await criarRecado(mockRecado)
    expect(result).toEqual(mockRecado)
  })

  it('listarRecados deve retornar lista de recados', async () => {
    const mockLista = [
      { id: 1, responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' },
      { id: 2, responsavel: 'Porteiro', tipo_recado: 'Comunicado', recado: 'Entrega às 10h' }
    ]
    pool.query.mockResolvedValueOnce({ rows: mockLista })

    const result = await listarRecados()
    expect(result).toEqual(mockLista)
  })

  it('buscarRecadoPorId deve retornar o recado correto', async () => {
    const mockRecado = { id: 1, responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' }
    pool.query.mockResolvedValueOnce({ rows: [mockRecado] })

    const result = await buscarRecadoPorId(1)
    expect(result).toEqual(mockRecado)
  })

  it('atualizarRecado deve retornar o recado atualizado', async () => {
    const mockRecado = { id: 1, responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião adiada' }
    pool.query.mockResolvedValueOnce({ rows: [mockRecado] })

    const result = await atualizarRecado(1, { recado: 'Reunião adiada' })
    expect(result).toEqual(mockRecado)
  })

  it('deletarRecado deve retornar o recado deletado', async () => {
    const mockRecado = { id: 1, responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' }
    pool.query.mockResolvedValueOnce({ rows: [mockRecado] })

    const result = await deletarRecado(1)
    expect(result).toEqual(mockRecado)
  })
})
