import { Server } from "socket.io";
import { Server as HttpServer } from 'http';

let expressServer: HttpServer | undefined;

//** Initializing the Socket Server */
export function initializingSocketServerOnThisServer(server: HttpServer) {
    expressServer = server;

    //**Configuring the Socket Server */
    const io = new Server(expressServer, {
        cors: {
            origin: "*"
        }
    });

    let connectedUsers: any = [];

    const checkUser=(email:string)=>{
        return connectedUsers.includes(email);
    }

    //* This is for main namespace
    io.on('connection', (socket) => {

        console.log("Connection happening ",socket.id)

        socket.on('addUser', (email) => {
            console.log("Checking", checkUser(email))
            if(!checkUser(email)){
                connectedUsers.push(email)
            }
            socket.join(email);
           console.log(connectedUsers);
        })


        socket.on('sendMessage', (data) => {
            console.log(data.message)
            socket.to(data.receiverEmail).emit('getMessage', data);
        })

        //* Disconnection socket
        socket.on("disconnect", (reason) => {
            console.log("Connecttion closed")
            console.log(reason)
        })
    })



}




// Comment Testing