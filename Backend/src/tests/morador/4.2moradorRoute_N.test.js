import request from 'supertest'
import express from 'express'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../controllers/moradoresControllers.js', () => ({
  createMorador: jest.fn((req, res) => res.status(400).json({ message: 'Todos os campos são obrigatórios' })),
  getMoradores: jest.fn((req, res) => res.status(500).json({ message: 'Erro ao listar moradores' })),
  getMoradorById: jest.fn((req, res) => res.status(404).json({ message: 'Morador não encontrado' })),
  updateMorador: jest.fn((req, res) => res.status(404).json({ message: 'Morador não encontrado para atualização' })),
  removeMorador: jest.fn((req, res) => res.status(404).json({ message: 'Morador não encontrado para exclusão' }))
}))

const moradoresRoute = (await import('../../routes/moradores.Route.js')).default

const app = express()
app.use(express.json())
app.use('/', moradoresRoute)

describe('moradoresRoute - negativos', () => {
  it('POST /moradores deve retornar 400 em erro', async () => {
    const response = await request(app).post('/moradores').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Todos os campos são obrigatórios')
  })

  it('GET /moradores deve retornar 500 em erro', async () => {
    const response = await request(app).get('/moradores')
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Erro ao listar moradores')
  })

  it('GET /moradores/:id deve retornar 404 em erro', async () => {
    const response = await request(app).get('/moradores/99')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Morador não encontrado')
  })

  it('PUT /moradores/:id deve retornar 404 em erro', async () => {
    const response = await request(app).put('/moradores/99').send({ nome: 'Teste' })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Morador não encontrado para atualização')
  })

  it('DELETE /moradores/:id deve retornar 404 em erro', async () => {
    const response = await request(app).delete('/moradores/99')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Morador não encontrado para exclusão')
  })
})
