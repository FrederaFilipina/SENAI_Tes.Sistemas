import { jest } from '@jest/globals'

jest.unstable_mockModule('../../repositories/authRepository.js', () => ({
  buscarUsuario: jest.fn()
}))

const { loginService } = await import('../../services/authServices.js')
const { buscarUsuario } = await import('../../repositories/authRepository.js')

describe('authServices.loginService - casos negativos', () => {
  it('Deve lançar erro se usuário ou senha não forem fornecidos', async () => {
    await expect(loginService({ usuario: '', senha: '' }))
      .rejects.toThrow('Usuário e senha são obrigatórios')
  })

  it('Deve lançar erro se usuário não for encontrado', async () => {
    buscarUsuario.mockResolvedValueOnce(null)

    await expect(loginService({ usuario: 'joao', senha: '123456' }))
      .rejects.toThrow('Usuário não encontrado')
  })

  it('Deve lançar erro se a senha estiver incorreta', async () => {
    const mockUsuario = { id: 1, usuario: 'joao', senha: '123456' }
    buscarUsuario.mockResolvedValueOnce(mockUsuario)

    await expect(loginService({ usuario: 'joao', senha: 'senhaErrada' }))
      .rejects.toThrow('Senha inválida')
  })
})
