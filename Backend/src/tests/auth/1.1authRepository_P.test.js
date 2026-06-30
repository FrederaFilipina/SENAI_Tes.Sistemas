import { jest } from '@jest/globals'

jest.unstable_mockModule('../../config/db.js', () => ({
  pool: {
    query: jest.fn()
  }
}))

const { buscarUsuario } = await import('../../repositories/authRepository.js')
const { pool } = await import('../../config/db.js')

describe('authRepository.buscarUsuario - Teste Positivo', () => {
  it('Deve retornar o usuário quando encontrado no banco', async () => {
    // Arrange: simula retorno do banco com usuário válido
    const mockUsuario = { id: 1, usuario: 'joao', senha: '123456' }
    pool.query.mockResolvedValueOnce({ rows: [mockUsuario] })

    // Act: chama a função com usuário existente
    const resultado = await buscarUsuario('joao')

    // Assert: verifica se a query foi chamada corretamente
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT id, usuario, senha'),
      ['joao']
    )
    // Assert: verifica se o resultado corresponde ao mock
    expect(resultado).toEqual(mockUsuario)
  })
})
