import request from 'supertest'
import express from 'express'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../services/authServices.js', () => ({
  loginService: jest.fn().mockResolvedValue({ id: 1, usuario: 'joao' })
}))

const authRoute = (await import('../../routes/auth.Route.js')).default

const app = express()
app.use(express.json())
app.use('/auth', authRoute)

describe('Auth Route - positivo', () => {
  it('Deve retornar 200 e mensagem de sucesso quando login for bem-sucedido', async () => {
    const response = await request(app)
      .post('/auth/login') // corrigido
      .send({ usuario: 'joao', senha: '123456' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Login realizado com sucesso')
    expect(response.body).toHaveProperty('morador')
  })
})
