const express = require('express')
const routeContacts = express.Router()
const { getLista, setDatos } = require('../data')


//Comparer Function    
function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
var sortList = () => getLista().sort(GetSortOrder("id"))
sortList()


routeContacts.get('/contacts', (req, res) => { // Mostrar todos los contactos
    res.json(getLista())
})

routeContacts.get('/contacts/:id', (req, res) => { // Mostrar un contacto
    const id = Number(req.params.id)
    let contacto = getLista().find(x => x.id === id)
    //console.log(contacto)
    if (contacto)
        res.status(200).json(contacto)
    else
        res.status(404).json({ error: 'Not Found' })

})

routeContacts.post('/contacts', (req, res) => { // Agregar un contacto    
    let newcontact = {
        date: req.body.date || new Date().toISOString(),
        name: req.body.name,
        phone: req.body.phone,
        favourite: req.body.favourite
    }

    if (newcontact.phone && newcontact.name.length > 2) { // Verifica que {name} tenga más de 2 caracteres
        let i = 1
        lista = getLista().concat(newcontact)
        setDatos(lista)
        newcontact.date ? null : newcontact.date = new Date().toISOString() // Si el {request} tiene un date no hace nada, sino agrega nuevo date
        lista.map( // Se asigna un {id} al nuevo contacto con un contador y se compara con los elementos de la lista
            (obj) => {
                newcontact.id = i
                obj.id == newcontact.id ? i += 1 : null
            }
        )
        sortList()
        //console.log(lista)
        res.status(201).json(lista)
    } else {
        res.status(400).json({ error: 'Bad Request' })
    }
})

routeContacts.patch('/contacts/:id', (req, res) => { // Editar un contacto
    const id = Number(req.params.id)
    const dato = req.body
    //console.log(dato.phone)
    let contacto = getLista().find(x => x.id === id)

    //console.log(contacto)

    if (contacto) { // Se modifican los campos del contacto si se encuentran en el request, sino quedan igual
        contacto.name = dato.name || contacto.name
        contacto.phone = dato.phone || contacto.phone
        contacto.date = dato.date || contacto.date
        contacto.favourite = dato.favourite || contacto.favourite

        res.status(200).json(contacto)
    }
    else
        res.status(404).json({ error: 'Not Found' })

})

routeContacts.delete('/contacts/:id', (req, res) => { // Borrar un contacto
    const id = Number(req.params.id)
    let bool = false
    let lista = getLista().filter(x => {
        (x.id !== id) ? null : bool = true;
        return x.id !== id
    })
    if (!bool) return res.status(404).json({ error: 'Not Found' })
    setDatos(lista)

    res.status(204).end()
})

module.exports = routeContacts