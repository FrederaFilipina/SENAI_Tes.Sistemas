import { jest } from '@jest/globals'

jest.unstable_mockModule('../../config/db.js', () => ({
  pool: {
    query: jest.fn()
  }
}))


const { buscarUsuario } = await import('../../repositories/authRepository.js')
const { pool } = await import('../../config/db.js')

describe('authRepository.buscarUsuario', () => {
  it('Deve retornar null quando o usuário não for encontrado', async () => {
    // Arrange: simula retorno vazio do banco
    pool.query.mockResolvedValueOnce({ rows: [] })

    const resultado = await buscarUsuario('usuarioInexistente')

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT id, usuario, senha'),
      ['usuarioInexistente']
    )
    expect(resultado).toBeNull()
  })
})
