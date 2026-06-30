import { jest } from '@jest/globals'

jest.unstable_mockModule('../../repositories/authRepository.js', () => ({
  buscarUsuario: jest.fn()
}))


const { loginService } = await import('../../services/authServices.js')
const { buscarUsuario } = await import('../../repositories/authRepository.js')

describe('authServices.loginService', () => {
  it('Deve retornar id e usuario quando login for bem-sucedido', async () => {

    const mockUsuario = { id: 1, usuario: 'joao', senha: '123456' }
    buscarUsuario.mockResolvedValueOnce(mockUsuario)

    const resultado = await loginService({ usuario: 'joao', senha: '123456' })

    expect(buscarUsuario).toHaveBeenCalledWith('joao')
    expect(resultado).toEqual({
      id: mockUsuario.id,
      usuario: mockUsuario.usuario
    })
  })
})
