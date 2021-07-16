const express = require('express')
const routeContacts = express.Router()
const { getLista, setDatos } = require('../data')
const service = require('../services/serviceContact')
const error = require('../middleware/error')
const notFound = require('../middleware/notFound')
const log = require('../middleware/log')


routeContacts.use(log)

routeContacts.get('/contacts', (req, res, next) => { // Mostrar todos los contactos
    service.getContacts()
        .then((obj) => res.json(obj))
        .catch((err) => next(err))
})

routeContacts.get('/contacts/:id', (req, res, next) => { // Mostrar un contacto
    let id = req.params.id

    service.getOneContact(id)
        .then((obj) => res.json(obj))
        .catch((err) => next(err))
})

routeContacts.post('/contacts', (req, res, next) => { // Agregar un contacto    
    let data = req.body

    service.addContact(data)
        .then((saved) => {
            console.log('Se guardo correctamente')
            res.status(201).json(saved)
        })
        .catch((err) => next(err))
})

routeContacts.patch('/contacts/:id', (req, res, next) => { // Editar un contacto
    let id = req.params.id
    let data = req.body

    service.updateContact(id, data)
        .then((saved) => {
            console.log('Se guardo correctamente')
            res.status(201).json(saved)
        })
        .catch((err) => next(err))
})

routeContacts.delete('/contacts/:id', (req, res, next) => { // Borrar un contacto
    let id = req.params.id

    service.deleteOneContact(id)
        .then((saved) => {
            console.log('Contacto Eliminado')
            res.status(204).json(saved)
        })
        .catch((err) => next(err))
})


routeContacts.use(error)
routeContacts.use(notFound)

module.exports = routeContacts