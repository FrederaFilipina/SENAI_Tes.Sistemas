import { pool } from '../config/db.js'

export async function buscarUsuario(usuario) {
    const query = `
        SELECT id, usuario, senha
        FROM moradores
        WHERE usuario = $1
    `

    const values = [usuario]
    const { rows } = await pool.query(query, values)

    // Tratamento explícito para retorno vazio
    if (rows.length === 0) {
        return null   // ou lançar um erro customizado, dependendo da lógica da aplicação
    }

    return rows[0]
}
