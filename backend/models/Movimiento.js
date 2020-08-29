const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema({
    id: String,
    cliente_id: String,
    tarjeta_id: String,
    fecha: Date,
    descripcion: String,
    importe: Number,
    activo: Boolean,
});

module.exports = mongoose.model("Movimiento", Schema);