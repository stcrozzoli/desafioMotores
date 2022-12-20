const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'handlebars')
app.engine('handlebars', engine())

let listaproductos = [{
    title:'Producto1',
    price: 99999,
    url: 'https://cdn2.iconfinder.com/data/icons/party-new-years/128/Party_Newyears_Disco_Lamp-64.png'
}]

app.post('/productos', (req, res) => {
    listaproductos.push(req.body)
    res.redirect('/productos')
})

app.get('/productos', (req, res) => {
    res.render('productos2', listaproductos)
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))