const express = require("express")
const Tarjeta = require("../models/Tarjeta")
const tarjetasRouter = express.Router()

// Obtener todas las tarjetas
tarjetasRouter.get("/tarjetas", async (req, res) => {
    const tarjetas = await Tarjeta.find()
    res.status(200).send(tarjetas);
})

// Obtener una tarjeta particular
tarjetasRouter.get("/tarjetas/:id", async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findOne({ _id: req.params.id });
        if (tarjeta == null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(tarjeta);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
  })

// Obtener todas las tarjetas de un cliente
tarjetasRouter.get("/clientes/:id/tarjetas", async (req, res) => {
    const tarjetas = await Tarjeta.find({ cliente_id: req.params.id });
    if (tarjetas.length == 0) {
        res.sendStatus(404);
    } else {
        res.status(200).send(tarjetas);
    }
  })

// Crear una nueva tarjeta
tarjetasRouter.post("/tarjetas", async (req, res) => {
    const tarjeta = new Tarjeta({
        cliente_id: req.body.cliente_id,
        numero: req.body.numero,
        limite: req.body.limite,
        fechaVencimiento: req.body.fechaVencimiento,
        activo: req.body.activo,
    })
    await tarjeta.save();
    res.statusCode = 201;
    res.send(tarjeta);
})

// Actualizar todos los datos de la tarjeta
tarjetasRouter.put("/tarjetas/:id", async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findOne({ _id: req.params.id });
        if (tarjeta == null) {
            res.sendStatus(404);
        } else {
            tarjeta.cliente_id = req.body.cliente_id;
            tarjeta.numero = req.body.numero;
            tarjeta.limite = req.body.limite;
            tarjeta.fechaVencimiento = req.body.fechaVencimiento;
            tarjeta.activo = req.body.activo;
            
            await tarjeta.save();
            res.status(200).send(tarjeta);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})

// Actualizar algunos de los datos de la tarjeta
tarjetasRouter.patch("/tarjetas/:id", async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findOne({ _id: req.params.id });
        if (tarjeta == null) {
            res.sendStatus(404);
        } else {
            if (req.body.cliente_id)
                tarjeta.cliente_id = req.body.cliente_id;
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
    } catch(CastError) {
        res.sendStatus(404);
    }
})

// Eliminar una tarjeta devolviendo el documento eliminado
tarjetasRouter.delete("/tarjetas/:id", async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findOne({ _id: req.params.id });
        if (tarjeta == null) {
            res.sendStatus(404);
        } else {
            await Tarjeta.deleteOne({ _id: req.params.id });
            res.status(200).send(tarjeta);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})

module.exports = tarjetasRouter