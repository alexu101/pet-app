import app from './app.js'
import { port } from './config/config.env.js'

app.listen(port, () =>{
    console.log(`Server started. Listening on port ${port}`)
})