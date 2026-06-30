import express from 'express'
import cors from 'cors'

import authRoutes from '../routes/auth.Route.js'
import moradoresRoutes from '../routes/moradores.Route.js'
import recadosRoutes from '../routes/recados.Route.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use(authRoutes)
app.use(moradoresRoutes)
app.use(recadosRoutes)

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Servidor está de pé e funcionando!'
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})