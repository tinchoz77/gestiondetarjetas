const express = require("express")
const Tarjeta = require("../models/Tarjeta")
const Movimiento = require("../models/Movimiento")
const tarjetasRouter = express.Router()

// Obtener todas las tarjetas
tarjetasRouter.get("/tarjetas", async (req, res) => {
    const tarjetas = await Tarjeta.find()
    res.status(200).send(tarjetas);
})

// Obtener una tarjeta particular
tarjetasRouter.get("/tarjetas/:id", async (req, res) => {
    const tarjeta = await Tarjeta.findById(req.params.id);
    if (tarjeta == null) {
        res.sendStatus(404);
    } else {
        res.status(200).send(tarjeta);
    }
  })

// Obtener todas las tarjetas de un cliente
tarjetasRouter.get("/clientes/:id/tarjetas", async (req, res) => {
    const tarjetas = await Tarjeta.find({ cliente: req.params.id });
    if (tarjetas.length == 0) {
        res.sendStatus(404);
    } else {
        res.status(200).send(tarjetas);
    }
  })

// Obtener todos los movimientos para una tarjeta
tarjetasRouter.get("/tarjetas/:id/movimientos", async (req, res) => {
    const movimientos = await Movimiento.find({ tarjeta: req.params.id });
    if (movimientos.length == 0) {
        res.sendStatus(404);
    } else {
        res.status(200).send(movimientos);
    }
  })

// Crear una nueva tarjeta
tarjetasRouter.post("/clientes/:id/tarjetas", async (req, res) => {
    const tarjeta = new Tarjeta({
        cliente: req.params.id,
        numero: req.body.numero,
        limite: req.body.limite,
        fechaVencimiento: req.body.fechaVencimiento,
        activo: req.body.activo,
    })
    await tarjeta.save();
    res.status(201).send(tarjeta);
})

// Actualizar todos los datos de la tarjeta
tarjetasRouter.put("/tarjetas/:id", async (req, res) => {
    const tarjeta = await Tarjeta.findById(req.params.id);
    if (tarjeta == null) {
        res.sendStatus(404);
    } else {
        tarjeta.cliente = req.body.cliente;
        tarjeta.numero = req.body.numero;
        tarjeta.limite = req.body.limite;
        tarjeta.fechaVencimiento = req.body.fechaVencimiento;
        tarjeta.activo = req.body.activo;
        
        await tarjeta.save();
        res.status(200).send(tarjeta);
    }
})

// Actualizar algunos de los datos de la tarjeta
tarjetasRouter.patch("/tarjetas/:id", async (req, res) => {
    const tarjeta = await Tarjeta.findById(req.params.id);
    if (tarjeta == null) {
        res.sendStatus(404);
    } else {
        if (req.body.cliente)
            tarjeta.cliente = req.body.cliente;
        if (req.body.numero)
            tarjeta.numero = req.body.numero;
        if (req.body.limite)
            tarjeta.limite = req.body.limite;
        if (req.body.fechaVencimiento)
            tarjeta.fechaVencimiento = req.body.fechaVencimiento;
        if (req.body.activo)
            tarjeta.activo = req.body.activo;
        
        await tarjeta.save();
        res.status(200).send(tarjeta);
    }
})

// Eliminar una tarjeta devolviendo el documento eliminado
tarjetasRouter.delete("/tarjetas/:id", async (req, res) => {
    const tarjeta = await Tarjeta.findByIdAndDelete(req.params.id);
    if (tarjeta == null) {
        res.sendStatus(404);
    } else {
        res.status(200).send(tarjeta);
    }
})

module.exports = tarjetasRouter