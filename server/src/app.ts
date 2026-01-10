import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import authRouter from './modules/auth/auth.routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World !')
})

app.use("/api/auth", authRouter)
app.use(errorHandler)

export default app