import { jest } from '@jest/globals'

jest.unstable_mockModule('../../services/authServices.js', () => ({
  loginService: jest.fn()
}))

const { login } = await import('../../controllers/authController.js')
const { loginService } = await import('../../services/authServices.js')

describe('authController.login - caso positivo', () => {
  it('Deve retornar 200 e mensagem de sucesso quando login for bem-sucedido', async () => {

    const mockUsuario = { id: 1, usuario: 'joao' }
    loginService.mockResolvedValueOnce(mockUsuario)

    const req = { body: { usuario: 'joao', senha: '123456' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await login(req, res)

    expect(loginService).toHaveBeenCalledWith({ usuario: 'joao', senha: '123456' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login realizado com sucesso',
      morador: mockUsuario
    })
  })
})
