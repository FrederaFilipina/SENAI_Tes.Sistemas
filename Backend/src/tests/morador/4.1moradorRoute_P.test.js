import request from 'supertest'
import express from 'express'
import { jest } from '@jest/globals'

jest.unstable_mockModule('../../controllers/moradoresControllers.js', () => ({
  createMorador: jest.fn((req, res) => res.status(201).json({ message: 'Morador criado com sucesso' })),
  getMoradores: jest.fn((req, res) => res.status(200).json([{ id: 1, nome: 'João' }])),
  getMoradorById: jest.fn((req, res) => res.status(200).json({ id: 1, nome: 'João' })),
  updateMorador: jest.fn((req, res) => res.status(200).json({ message: 'Morador atualizado com sucesso' })),
  removeMorador: jest.fn((req, res) => res.status(200).json({ message: 'Morador removido com sucesso' }))
}))

const moradoresRoute = (await import('../../routes/moradores.Route.js')).default

const app = express()
app.use(express.json())
app.use('/', moradoresRoute)

describe('moradoresRoute - positivos', () => {
  it('POST /moradores deve retornar 201', async () => {
    const response = await request(app).post('/moradores').send({ nome: 'João' })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Morador criado com sucesso')
  })

  it('GET /moradores deve retornar 200', async () => {
    const response = await request(app).get('/moradores')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ id: 1, nome: 'João' }])
  })

  it('GET /moradores/:id deve retornar 200', async () => {
    const response = await request(app).get('/moradores/1')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id: 1, nome: 'João' })
  })

  it('PUT /moradores/:id deve retornar 200', async () => {
    const response = await request(app).put('/moradores/1').send({ nome: 'João Atualizado' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Morador atualizado com sucesso')
  })

  it('DELETE /moradores/:id deve retornar 200', async () => {
    const response = await request(app).delete('/moradores/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Morador removido com sucesso')
  })
})
