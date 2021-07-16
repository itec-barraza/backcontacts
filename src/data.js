let listadeContactos = [{
    "id": 2,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": true,
    "name": "juan",
    "phone": "66666666"
},
{
    "id": 4,
    "date": "2019-05-30T19:20:14.298Z",
    "favourite": false,
    "name": "pedro",
    "phone": "22222222"
},
{
    "id": 1
},
{
    "id": 5
}]

function getLista(){
    return listadeContactos
}

function setDatos(newDatos){
    listadeContactos = newDatos
}

module.exports = {getLista, setDatos}