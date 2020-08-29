const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema({
    id: String,
    cliente_id: String,
    numero: String,
    limite: Number,
    fechaVencimiento: Date,
    activo: Boolean,
});

module.exports = mongoose.model("Tarjeta", Schema);