var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    id: String,
    nombre: String,
    apellido: String,
    email: String,
    activo: Boolean
});

// Compile model from schema
var ClienteModel = mongoose.model('ClienteModel', ClienteSchema );