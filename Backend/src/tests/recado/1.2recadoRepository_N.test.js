import { jest } from '@jest/globals'
jest.unstable_mockModule('../../config/db.js', () => ({ pool: { query: jest.fn() } }))

const { pool } = await import('../../config/db.js')
const { criarRecado, atualizarRecado, deletarRecado } = await import('../../repositories/recadosRepository.js')

describe('recadosRepository - negativos', () => {
  it('criarRecado deve lançar erro para tipo_recado inválido', async () => {
    const recadoInvalido = { responsavel: 'Síndico', tipo_recado: 'Errado', recado: 'Teste inválido' }

    await expect(criarRecado(recadoInvalido))
      .rejects
      .toThrow('tipo_recado inválido. Valores aceitos: Aviso, Comunicado, Encomenda')
  })

  it('atualizarRecado deve lançar erro se nenhum campo for passado', async () => {
    await expect(atualizarRecado(1, {}))
      .rejects
      .toThrow('Nenhum campo para atualizar')
  })

  it('atualizarRecado deve lançar erro para tipo_recado inválido', async () => {
    const camposInvalidos = { tipo_recado: 'Errado' }

    await expect(atualizarRecado(1, camposInvalidos))
      .rejects
      .toThrow('tipo_recado inválido. Valores aceitos: Aviso, Comunicado, Encomenda')
  })

  it('deletarRecado deve retornar null quando não encontrar recado', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    const result = await deletarRecado(999)
    expect(result).toBeNull()
  })
})
