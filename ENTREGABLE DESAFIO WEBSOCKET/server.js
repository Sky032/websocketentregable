// server

const express=require ('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const moment = require("moment");

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('/index.html',{root: __dirname})
})

const Contenedor = require("./Api/ClaseContenedor");
const ContenedorProducto = new Contenedor('./productos.txt');

const Comentarios = require('./Api/ComentariosArray.js');
const DbComentarios = new Comentarios('./comentarios.txt');


io.on('connection',async (socket)=>{
    console.log('usuario conectado')
    
    // cargar comentarios

    const comentarios= await  DbComentarios.getAllComments()

    const listadoComentarios={
        mensaje:'listado comentarios disponible',
        comentarios
    }

    io.emit('comentarios',listadoComentarios)
    
    // nuevo comentario
    socket.on('nuevo-comentario',nuevoComentario =>{
        console.log('se agrego un nuevo comentario');
        nuevoComentario.date = moment().format("LLLL");
        DbComentarios.save(nuevoComentario);
        io.emit('comentarios',listadoComentarios)
        
    })
    
    // cargar productos

    const productos= await  ContenedorProducto.readFileFunction()

    const listadoProductos={
        mensaje:'listado productos disponible',
        productos
    }
    
    io.emit('productos',listadoProductos)

    // nuevo producto
    socket.on('nuevo-producto',producto =>{
        console.log('se agrego un nuevo producto');
        ContenedorProducto.save(producto);
        io.emit('productos',listadoProductos);
    });

})
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT,()=>{
    console.log(`Escuchando en puerto ${PORT}`)
})