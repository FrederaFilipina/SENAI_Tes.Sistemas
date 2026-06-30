import request from 'supertest'
import express from 'express'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../services/authServices.js', () => ({
  loginService: jest.fn()
}))

const authRoute = (await import('../../routes/auth.Route.js')).default
const { loginService } = await import('../../services/authServices.js')

const app = express()
app.use(express.json())
app.use('/auth', authRoute)

describe('Auth Route - negativos', () => {
  it('Deve retornar 400 quando faltar usuário/senha', async () => {
    loginService.mockRejectedValueOnce(new Error('Usuário e senha são obrigatórios'))

    const response = await request(app)
      .post('/auth/login')
      .send({ usuario: '', senha: '' })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'Usuário e senha são obrigatórios')
  })

  it('Deve retornar 404 quando usuário não for encontrado', async () => {
    loginService.mockRejectedValueOnce(new Error('Usuário não encontrado'))

    const response = await request(app)
      .post('/auth/login')
      .send({ usuario: 'usuarioInexistente', senha: '123456' })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error', 'Usuário não encontrado')
  })

  it('Deve retornar 401 quando a senha for inválida', async () => {
    loginService.mockRejectedValueOnce(new Error('Senha inválida'))

    const response = await request(app)
      .post('/auth/login')
      .send({ usuario: 'joao', senha: 'senhaErrada' })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'Senha inválida')
  })

  it('Deve retornar 500 para erros inesperados', async () => {
    loginService.mockRejectedValueOnce(new Error('Falha inesperada'))

    const response = await request(app)
      .post('/auth/login')
      .send({ usuario: 'joao', senha: '123456' })

    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('error', 'Erro interno no servidor')
  })
})
