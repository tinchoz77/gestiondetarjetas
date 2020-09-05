const express = require("express")
const Movimiento = require("../models/Movimiento")
const movimientosRouter = express.Router()

// Obtener todos los movimientos
movimientosRouter.get("/movimientos", async (req, res) => {
    const movimientos = await Movimiento.find()
    res.status(200).send(movimientos);
})

// Obtener un movimiento particular
movimientosRouter.get("/movimientos/:id", async (req, res) => {
    const movimiento = await Movimiento.findById(req.params.id);
    if (movimiento == null) {
        res.sendStatus(404);
    } else {
        res.status(200).send(movimiento);
    }
  })

// Crear un nuevo movimiento
movimientosRouter.post("/tarjetas/:id/movimientos", async (req, res) => {
    const movimiento = new Movimiento({
        cliente: req.body.cliente,
        tarjeta: req.params.id,
        fecha: req.body.fecha,
        descripcion: req.body.descripcion,
        importe: req.body.importe,
        activo: req.body.activo,
    })
    await movimiento.save();
    res.status(201).send(movimiento);
})

// No se permite actualizar todos los datos del movimiento
movimientosRouter.put("/movimientos/:id", async (req, res) => {
    res.sendStatus(403);
})

// Actualizar el estado del movimiento
movimientosRouter.patch("/movimientos/:id", async (req, res) => {
    const movimiento = await Movimiento.findById(req.params.id);
    if (movimiento == null) {
        res.sendStatus(404);
    } else {
        if (req.body.activo)
            movimiento.activo = req.body.activo;
        
        await movimiento.save();
        res.status(200).send(movimiento);
    }
})

// Obtener todos los movimientos para una tarjeta
movimientosRouter.get("/tarjetas/:id/movimientos", async (req, res) => {
    const movimientos = await Movimiento.find({ tarjeta: req.params.id });
    if (!movimientos.length) {
        res.sendStatus(404);
    } else {
        res.status(200).send(movimientos);
    }
  })

// No se permite eliminar un movimiento
movimientosRouter.delete("/movimientos/:id", async (req, res) => {
    res.sendStatus(403);
})

module.exports = movimientosRouter