import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { initializingSocketServerOnThisServer } from "./socketServer"


if (!process.env.HTTP_PORT) {
    require('dotenv-flow').config()
}



const SERVER_PORT = process.env.HTTP_PORT;

const app = express()
app.disable('x-powered-by')

app.use(cookieParser())
app.use(express.json())

app.use('*', cors())



const server = app.listen(SERVER_PORT, () => {
    console.log(`NODE_ENV is : ${process.env.NODE_ENV}.\n Express server has started on port ${SERVER_PORT}.`)
})

initializingSocketServerOnThisServer(server)

server.on('error', (err) => {
    console.log(`Express server encountered an error: ${err}`);
})




