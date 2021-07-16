const express = require('express')
const cors = require('cors')
const routeContacts = require('./controllers/Contacts')
const app = express()
const version = '/' // version controladores

const notFound = require('./middleware/notFound')
const error = require('./middleware/error')

app.get('/', (req, res) => { // Home
    res.send('<h1>Agenda de Contactos</h1>')
})
app.use(cors())
app.use(express.json())
app.use(version,routeContacts)
app.use(notFound)
app.use(error)

module.exports = app