const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema({
    id: String,
    nombre: String,
    apellido: String,
    email: String,
    activo: Boolean,
});

module.exports = mongoose.model("Cliente", Schema);