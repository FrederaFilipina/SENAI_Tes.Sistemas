import { pool } from '../config/db.js'

const TIPOS_RECADO_VALIDOS = ['Aviso', 'Comunicado', 'Encomenda']

function validarTipoRecado(tipo) {
    if (!TIPOS_RECADO_VALIDOS.includes(tipo)) {
        throw new Error(`tipo_recado inválido. Valores aceitos: ${TIPOS_RECADO_VALIDOS.join(', ')}`)
    }
}


export async function criarRecado({ responsavel, tipo_recado, recado }) {
    validarTipoRecado(tipo_recado)

    const query = `
        INSERT INTO recados (
            responsavel,
            tipo_recado,
            recado
        )
        VALUES ($1, $2, $3)
        RETURNING *
    `

    const values = [responsavel, tipo_recado, recado]

    const { rows } = await pool.query(query, values)
    return rows[0]
}


export async function listarRecados() {
    const query = `SELECT * FROM recados ORDER BY criado DESC`
    const { rows } = await pool.query(query)
    return rows
}


export async function buscarRecadoPorId(id) {
    const query = `SELECT * FROM recados WHERE id = $1`
    const { rows } = await pool.query(query, [id])
    return rows[0]
}


export async function atualizarRecado(id, campos) {
    if (campos.tipo_recado) validarTipoRecado(campos.tipo_recado)

    const setClauses = []
    const values = []
    let index = 1

    for (const [chave, valor] of Object.entries(campos)) {
        setClauses.push(`${chave} = $${index}`)
        values.push(valor)
        index++
    }

    if (setClauses.length === 0) {
        throw new Error('Nenhum campo para atualizar')
    }

    const query = `
        UPDATE recados
        SET ${setClauses.join(', ')}
        WHERE id = $${index}
        RETURNING *
    `
    values.push(id)

    const { rows } = await pool.query(query, values)
    return rows[0]
}


export async function deletarRecado(id) {
    const query = `DELETE FROM recados WHERE id = $1 RETURNING *`
    const { rows } = await pool.query(query, [id])
    return rows[0] ?? null
}
