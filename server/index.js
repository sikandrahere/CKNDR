import app from "./app.js";
import dotenv from 'dotenv'
import http from 'http'
import dbConnect from "./src/db/dbConnect.js";

dotenv.config()
const port = process.env.PORT||3000;;

const server= http.createServer(app)

dbConnect()
.then(()=>{
    server.listen(port,()=>{
        console.log(`app is listing on port: ${port}`)
    }) 
})
.catch((err)=>{
    console.log(err)
})