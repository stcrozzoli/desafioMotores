const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const { SocketAddress } = require('net')
const { mainModule } = require('process')
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'handlebars')
app.engine('handlebars', engine())
app.use(express.static('views'))

let listaproductos = [{
    title:'Producto1',
    price: 99999,
    url: 'https://cdn2.iconfinder.com/data/icons/party-new-years/128/Party_Newyears_Disco_Lamp-64.png'
}]

const http = require('http').createServer(app);
const io = require('socket.io')(http);
let msgs = [{
  autor:'User 1',
  msg:'Hola a todos!'
},{
  autor:'User 2',
  msg:'Buenasss'
}]

io.on('connection', function(socket) {
    console.log ('Un usuario se ha conectado');
    socket.emit('message', msgs)
    console.log(msgs)

    socket.on('newMessage', (data)=>{
      msgs.push(data)
      io.sockets.emit('message', msgs)
    })
  });


app.get('/productos', (req, res) => {
  res.render('productos2', { listaproductos: listaproductos });
});


app.post('/productos', (req, res) => {
    listaproductos.push(req.body)
    res.redirect('/productos')
    console.log(listaproductos)
})

const PORT = 8080


http.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });


http.on('error', error => console.log(`Error en servidor ${error}`))