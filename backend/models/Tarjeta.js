const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clientes'
    },
    numero: String,
    limite: Number,
    fechaVencimiento: Date,
    activo: Boolean,
});

module.exports = mongoose.model("Tarjeta", Schema);