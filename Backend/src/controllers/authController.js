import { loginService } from '../services/authServices.js'

export async function login(req, res) {
    try {
        const { usuario, senha } = req.body

        const morador = await loginService({ usuario, senha })

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            morador
        })
    } catch (error) {
        switch (error.message) {
            case 'Usuário e senha são obrigatórios':
                return res.status(400).json({ error: error.message })
            case 'Usuário não encontrado':
                return res.status(404).json({ error: error.message })
            case 'Senha inválida':
                return res.status(401).json({ error: error.message })
            default:
                return res.status(500).json({ error: 'Erro interno no servidor' })
        }
    }
}
