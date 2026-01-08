import dotenv from 'dotenv'
import { PrismaClient } from '../generated/client.js'

dotenv.config()

export const prisma = new PrismaClient({
    accelerateUrl: ''
})

export const connectToDb = async () => {
    try {
        await prisma.$connect()
        console.log("Successfully connected to the database")
    } catch(err) {
        console.log("Connection to the database failed")
    }
}
