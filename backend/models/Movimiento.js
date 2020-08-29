const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    tarjeta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarjeta'
    },
    fecha: Date,
    descripcion: String,
    importe: Number,
    activo: Boolean,
});

module.exports = mongoose.model("Movimiento", Schema);