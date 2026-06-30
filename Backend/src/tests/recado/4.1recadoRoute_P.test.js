import request from 'supertest'
import express from 'express'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../controllers/recadosControllers.js', () => ({
  createRecado: jest.fn((req, res) => res.status(201).json({ message: 'Recado criado com sucesso' })),
  getRecados: jest.fn((req, res) => res.status(200).json([{ id: 1, recado: 'Reunião amanhã' }])),
  getRecadoById: jest.fn((req, res) => res.status(200).json({ id: 1, recado: 'Reunião amanhã' })),
  updateRecado: jest.fn((req, res) => res.status(200).json({ message: 'Recado atualizado com sucesso' })),
  removeRecado: jest.fn((req, res) => res.status(200).json({ message: 'Recado removido com sucesso' }))
}))

const recadosRoute = (await import('../../routes/recados.Route.js')).default

const app = express()
app.use(express.json())
app.use('/', recadosRoute)

describe('recadosRoute - positivos', () => {
  it('POST /recados deve retornar 201', async () => {
    const response = await request(app).post('/recados').send({ responsavel: 'Síndico', tipo_recado: 'Aviso', recado: 'Reunião amanhã' })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Recado criado com sucesso')
  })

  it('GET /recados deve retornar 200', async () => {
    const response = await request(app).get('/recados')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ id: 1, recado: 'Reunião amanhã' }])
  })

  it('GET /recados/:id deve retornar 200', async () => {
    const response = await request(app).get('/recados/1')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id: 1, recado: 'Reunião amanhã' })
  })

  it('PUT /recados/:id deve retornar 200', async () => {
    const response = await request(app).put('/recados/1').send({ recado: 'Reunião adiada' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Recado atualizado com sucesso')
  })

  it('DELETE /recados/:id deve retornar 200', async () => {
    const response = await request(app).delete('/recados/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Recado removido com sucesso')
  })
})
