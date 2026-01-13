import app from './app.js'
import { connectToDb } from './config/config.db.js'
import { port } from './config/config.env.js'

app.listen(port, async () =>{
    await connectToDb()
    console.log(`Server started. Listening on port ${port}`)
})