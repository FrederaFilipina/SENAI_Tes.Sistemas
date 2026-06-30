import { pool } from '../config/db.js'


export async function criarMorador({ nome, bloco, num_ap, usuario, senha }) {
    try {
        const query = `
            INSERT INTO moradores (
                nome,
                bloco,
                num_ap,
                usuario,
                senha
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `
        const values = [nome, bloco, num_ap, usuario, senha]
        const { rows } = await pool.query(query, values)

        return rows[0]

    } catch (error) {
        if (error.code === '23505'){ // violação de UNIQUE (usuario duplicado)
            throw new Error('Usuário já existe')
        }
        throw new Error('Erro ao criar morador: ' + error.message)
    }
}


export async function listarMoradores() {
    try {
        const query = `
            SELECT id, nome, bloco, num_ap, usuario
            FROM moradores
            ORDER BY id ASC
        `
        const { rows } = await pool.query(query)
        return rows

    } catch (error) {
        throw new Error('Erro ao listar moradores: ' + error.message)
    }
}


export async function buscarMoradorPorId(id) {
    try {
        const query = `
            SELECT id, nome, bloco, num_ap, usuario
            FROM moradores
            WHERE id = $1
        `
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) {
            throw new Error('Morador não encontrado.')
        }
        return rows[0]

    } catch (error) {
        throw new Error('Erro ao buscar morador: ' + error.message)
    }
}


export async function atualizarMorador(id, { nome, bloco, num_ap, usuario }) {
    try {
        const query = `
            UPDATE moradores
            SET nome = $1,
                bloco = $2,
                num_ap = $3,
                usuario = $4
            WHERE id = $5
            RETURNING *
        `
        const values = [nome, bloco, num_ap, usuario, id]
        const { rows } = await pool.query(query, values)

        if (rows.length === 0) {
            throw new Error('Morador não encontrado para atualização.')
        }
        return rows[0]

    } catch (error) {
        if (error.code === '23505') { // violação de UNIQUE (usuario duplicado)
            throw new Error('Usuário já existe.')
        }
        throw new Error('Erro ao atualizar morador: ' + error.message)
    }
}


export async function deletarMorador(id) {
    try {
        const query = `
            DELETE FROM moradores
            WHERE id = $1
            RETURNING *
        `
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) {
            throw new Error('Morador não encontrado para exclusão.')
        }

        return rows[0]
    } catch (error) {
        throw new Error('Erro ao deletar morador: ' + error.message)
    }
}