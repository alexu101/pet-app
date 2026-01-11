import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
})

export const prisma = new PrismaClient({adapter})

export const connectToDb = async () => {
    try {
        await prisma.$connect()
        console.log("Successfully connected to the database")
    } catch(err) {
        console.log("Connection to the database failed")
    }
}
