import httpServer from './src/App.js'
import dotenv from 'dotenv'

dotenv.config({path:'.env'})

const port=process.env.PORT || 4000





httpServer.listen(port,()=>{
    console.log(`server run in port :${port}`)
})