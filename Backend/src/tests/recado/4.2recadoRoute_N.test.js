import request from 'supertest'
import express from 'express'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../controllers/recadosControllers.js', () => ({
  createRecado: jest.fn((req, res) => res.status(400).json({ message: 'Erro ao criar recado' })),
  getRecados: jest.fn((req, res) => res.status(500).json({ message: 'Erro ao listar recados' })),
  getRecadoById: jest.fn((req, res) => res.status(404).json({ message: 'Recado não encontrado' })),
  updateRecado: jest.fn((req, res) => res.status(400).json({ message: 'Erro ao atualizar recado' })),
  removeRecado: jest.fn((req, res) => res.status(404).json({ message: 'Recado não encontrado' }))
}))

const recadosRoute = (await import('../../routes/recados.Route.js')).default

const app = express()
app.use(express.json())
app.use('/', recadosRoute)

describe('recadosRoute - negativos', () => {
  it('POST /recados deve retornar 400 em caso de erro', async () => {
    const response = await request(app).post('/recados').send({ responsavel: 'Síndico' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Erro ao criar recado')
  })

  it('GET /recados deve retornar 500 em caso de erro', async () => {
    const response = await request(app).get('/recados')
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Erro ao listar recados')
  })

  it('GET /recados/:id deve retornar 404 se recado não encontrado', async () => {
    const response = await request(app).get('/recados/999')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Recado não encontrado')
  })

  it('PUT /recados/:id deve retornar 400 em caso de erro', async () => {
    const response = await request(app).put('/recados/1').send({ recado: 'Teste inválido' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Erro ao atualizar recado')
  })

  it('DELETE /recados/:id deve retornar 404 se recado não encontrado', async () => {
    const response = await request(app).delete('/recados/999')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Recado não encontrado')
  })
})
