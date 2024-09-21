import app from './src/App.js'
import dotenv from 'dotenv'

dotenv.config({path:'.env'})

const port=process.env.PORT || 4000





app.listen(port,()=>{
    console.log(`server run in port :${port}`)
})