const express=require('express')
const app=express();
const http=require('http').createServer(app);

const port=process.env.port||3000;

http.listen(port,(req,res)=>{

    console.log(`server is running on port ${port}`)
})

app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
   res.sendFile(__dirname+'/index.html')
})



//socket connection

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected build...')

    socket.on('message',(msg)=>{
      socket.broadcast.emit('message',msg);

    })
    
  

})