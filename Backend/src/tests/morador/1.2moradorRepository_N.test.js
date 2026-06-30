import { jest } from '@jest/globals'

jest.unstable_mockModule('../../config/db.js', () => ({
  pool: { query: jest.fn() }
}))

const { pool } = await import('../../config/db.js')
const { criarMorador, listarMoradores, buscarMoradorPorId, atualizarMorador, deletarMorador } = await import('../../repositories/moradoresRepository.js')

describe('moradoresRepository - negativos', () => {
  it('criarMorador deve lançar erro se usuário já existe', async () => {
    pool.query.mockRejectedValueOnce({ code: '23505', message: 'duplicate key' })

    await expect(criarMorador({ usuario: 'joao' }))
      .rejects.toThrow('Usuário já existe')
  })

  it('buscarMoradorPorId deve lançar erro se não encontrar morador', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    await expect(buscarMoradorPorId(99))
      .rejects.toThrow('Morador não encontrado.')
  })

  it('atualizarMorador deve lançar erro se não encontrar morador', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    await expect(atualizarMorador(99, { nome: 'Teste' }))
      .rejects.toThrow('Morador não encontrado para atualização.')
  })

  it('deletarMorador deve lançar erro se não encontrar morador', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] })

    await expect(deletarMorador(99))
      .rejects.toThrow('Morador não encontrado para exclusão.')
  })

  it('listarMoradores deve lançar erro em falha de query', async () => {
    pool.query.mockRejectedValueOnce(new Error('Falha no banco'))

    await expect(listarMoradores())
      .rejects.toThrow('Erro ao listar moradores: Falha no banco')
  })
})
