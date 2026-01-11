import express, { NextFunction } from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import authRouter from './modules/auth/auth.routes.js'
import { authorize } from './middlewares/authorization.js'

const app = express()

app.use(express.json())

app.get('/',authorize, (req, res, next: NextFunction) => {
    console.log(req.claims)
    res.send('Hello World !')
})

app.use("/api/auth", authRouter)

app.use(errorHandler)

export default app