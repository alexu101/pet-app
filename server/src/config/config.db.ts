import dotenv from 'dotenv'
import {PrismaClient} from "../generated/prisma/client.js"

dotenv.config()

export const prisma = new PrismaClient()