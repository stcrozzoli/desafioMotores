const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'handlebars')
app.engine('handlebars', engine())

let listaproductos = [{
    title:'Producto1',
    price: 99999,
    url: 'https://cdn2.iconfinder.com/data/icons/party-new-years/128/Party_Newyears_Disco_Lamp-64.png'
}]


// /////////////////////////
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
  });
// ////////////////////////

app.get('/productos', (req, res) => {
    res.render('productos2', { listaproductos: listaproductos });
});


app.post('/productos', (req, res) => {
    listaproductos.push(req.body)
    res.redirect('/productos')
    console.log(listaproductos)
})


const PORT = 8080
// const server = app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${server.address().port}`)
// })


// /////////
http.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

// server.on('error', error => console.log(`Error en servidor ${error}`))

http.on('error', error => console.log(`Error en servidor ${error}`))