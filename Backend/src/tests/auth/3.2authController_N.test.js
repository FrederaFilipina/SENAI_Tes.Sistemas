import { jest } from '@jest/globals'

jest.unstable_mockModule('../../services/authServices.js', () => ({
  loginService: jest.fn()
}))

// Importa depois de declarar o mock
const { login } = await import('../../controllers/authController.js')
const { loginService } = await import('../../services/authServices.js')

describe('authController.login - casos negativos', () => {
  it('Deve retornar 400 quando usuário ou senha não forem fornecidos', async () => {
    loginService.mockRejectedValueOnce(new Error('Usuário e senha são obrigatórios'))

    const req = { body: { usuario: '', senha: '' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário e senha são obrigatórios' })
  })

  it('Deve retornar 404 quando usuário não for encontrado', async () => {
    loginService.mockRejectedValueOnce(new Error('Usuário não encontrado'))

    const req = { body: { usuario: 'joao', senha: '123456' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado' })
  })

  it('Deve retornar 401 quando a senha for inválida', async () => {
    loginService.mockRejectedValueOnce(new Error('Senha inválida'))

    const req = { body: { usuario: 'joao', senha: 'senhaErrada' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Senha inválida' })
  })

  it('Deve retornar 500 para erros inesperados', async () => {
    loginService.mockRejectedValueOnce(new Error('Falha inesperada'))

    const req = { body: { usuario: 'joao', senha: '123456' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno no servidor' })
  })
})
