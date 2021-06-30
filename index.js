const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000
const loginTime = require('./public/time')

app.use("/static", express.static('public'))
app.set("view engine", 'pug')
app.set("views" , "./views")

let arrUser= []
let arrChat= []
//listen connnection
io.on('connection', (socket) =>{
    console.log(`${socket.id} is connect to server`)
    socket.emit("Server-send-Message", arrChat)
    //listen disconnect
    socket.on('disconnect', ()=>{
        arrUser.splice(arrUser.indexOf(socket.username), 1)
        socket.broadcast.emit("Sever-send-UserList", arrUser)
    })

    socket.on("Client-send-Username", (username)=>{
        // Case 1: sever send data to ALL(theard 2) after socket send data to server(thread 1)
        // io.sockets.emit("Server-send-data", data)
        // Case 2: sever send data to socket after socket send data to server   
        // socket.emit("Server-send-data", data)
        // Case 3: sever send data to (other sockets) after current socket send data to server
        // socket.broadcast.emit("Server-send-data", data.reduce(function (a,b){return a+b}))
        // Case 4: io.to("socketid").emit(): Chatting between two socket
        
        if(arrUser.indexOf(username) >= 0){
            socket.emit("Server-send-failure", "Tên ĐN đã tồn tại",)
        }else{
            socket.userName = username
            socket.emit("Server-send-success", username)
        }
    })

    socket.on("Client-send-Animal", (animal)=>{
        socket.animal = animal
        arrUser.push({username: socket.userName, animal: socket.animal, loginTime: loginTime()})
        io.sockets.emit("Sever-send-UserList", arrUser)
    })

    socket.on("Client-send-Message", (mess)=>{
        let timeSend = loginTime();
        arrChat.push({username: socket.userName, animal: socket.animal, content: mess, timeSend: timeSend})
        io.sockets.emit("Server-send-Message", arrChat)
    })

    socket.on('logout', ()=>{
        arrUser.splice(arrUser.indexOf(socket.username), 1)
        socket.broadcast.emit("Sever-send-UserList", arrUser)
    })

    socket.on('Text-is-Editting', ()=>{
        socket.broadcast.emit('Someone-is-Sending')
    })

    socket.on('No-Editting', ()=>{
        socket.broadcast.emit('Nobody-is-Sending')
    })
})

app.get("/", function(req,res){
    res.render("chat")
})

server.listen(port, ()=>{
    console.log("Sever starting at port "+ port)
})