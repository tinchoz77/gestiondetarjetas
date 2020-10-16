const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    activo: Boolean,
});

module.exports = mongoose.model("Cliente", Schema);