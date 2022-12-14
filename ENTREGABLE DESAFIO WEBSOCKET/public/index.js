const socket=io.connect()

const addComment=(evt)=>{

    const nombreUsuario=document.querySelector('#nombreUsuario').value;
    const comentario=document.querySelector('#comentario').value;
    const date=new Date().toLocaleString()

    let nuevoComentario={nombreUsuario,comentario,date}

    console.log(nuevoComentario)
    socket.emit('nuevo-comentario',nuevoComentario);
    form.reset();

    return false;  
}

const renderComentarios=(comentarios)=>{
    let  vistaComentarios=document.getElementById('listadoComentarios');

    let html= comentarios.map(coment=>{
        return `<div>
                <strong class="text-primary">${coment.nombreUsuario}</strong>:
                <em class="text-danger">[${coment.date}]</em>
                <em class="text-success">${coment.comentario}</em>
              </div>`
    })

    vistaComentarios.innerHTML=html.join(' ')
}

socket.on('comentarios',listadoComentarios=>{
    renderComentarios(listadoComentarios.comentarios)
})

const addProduct=(event)=>{
    
    const titulo=document.querySelector('#titulo').value;
    const precio=document.getElementById('precio').value;
    const imagen=document.getElementById('imagen').value;

    let producto = {titulo,precio,imagen}
    

    console.log(producto)
    socket.emit('nuevo-producto',producto);
    form.reset();

    return false;
};

const render=(productos)=>{
    let  vistaProductos=document.getElementById('vistaProductos');
    let html= productos.map(prod=>{
        return `
        <ul style="list-style: none">
            <div class="card">
                <img src=${prod.imagen} class="card-img-top" alt="">
                <li class="nombre-producto">${prod.titulo}</li>
                <li class="card-precio">${prod.precio}</li>
            </div>
        </ul>`
    })

    vistaProductos.innerHTML=html.join(' ')
}

socket.on('productos',listadoProductos=>{
    render(listadoProductos.productos)
})





