let socket = io.connect ()

socket.on("message", (data)=>{
    console.log(data)
    renderizar(data)
})

const renderizar = (data) => {
    let fechaHora = new Date();
    let fechaHoraFormateada = fechaHora.toLocaleString();
    let chatBox = data.map(function(el, index){
        return (`
            <div>
             <p><strong style="font-weight: bold; color:blue">${el.autor} </strong><span style="color:brown">${fechaHoraFormateada}</span>: <span style="font-style: italic;color:green">${el.msg}</span>
            </div>
        `)
    }).join(' ')
    document.getElementById('mensajes').innerHTML = chatBox
}

const addMessage = (e) => {
    let nuevoMensaje = {
        autor: document.getElementById ('username').value,
        msg: document.getElementById ('text').value
    }

    socket.emit('newMessage', nuevoMensaje)
    document.getElementById ('username').value = ''
    document.getElementById ('text').value = ''

    return false

}
