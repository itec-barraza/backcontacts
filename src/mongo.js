const mongoose = require('mongoose')

//Connection URL
const connectString = 'mongodb+srv://<user>:<password>@cluster0.pqhsd.mongodb.net/<database>?retryWrites=true&w=majority'
console.log('Conexión a BDD')
bdd = mongoose.connect(connectString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Conexión exitosa'))
    .catch((e)=>console.log('Falla en la conexión:', e.message))
