const express = require("express")
const Movimiento = require("../models/Movimiento")
const movimientosRouter = express.Router()

// Obtener todos los clientes
movimientosRouter.get("/movimientos", async (req, res) => {
    const movimientos = await Movimiento.find()
    res.status(200).send(movimientos);
})

// Obtener un cliente particular
movimientosRouter.get("/movimientos/:id", async (req, res) => {
    try {
        const movimiento = await Movimiento.findOne({ _id: req.params.id });
        if (movimiento == null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(movimiento);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
  })

// Crear un nuevo cliente
movimientosRouter.post("/movimientos", async (req, res) => {
    const movimiento = new Movimiento({
        cliente_id: req.body.cliente_id,
        tarjeta_id: req.body.tarjeta_id,
        fecha: req.body.fecha,
        descripcion: req.body.descripcion,
        importe: req.body.importe,
        activo: req.body.activo,
    })
    await movimiento.save();
    res.statusCode = 201;
    res.send(movimiento);
})

// Actualizar todos los datos del cliente
movimientosRouter.put("/movimientos/:id", async (req, res) => {
    try {
        const movimiento = await Movimiento.findOne({ _id: req.params.id });
        if (movimiento == null) {
            res.sendStatus(404);
        } else {
            movimiento.cliente_id = req.body.cliente_id;
            movimiento.tarjeta_id = req.body.tarjeta_id;
            movimiento.fecha = req.body.fecha;
            movimiento.descripcion = req.body.descripcion;
            movimiento.importe = req.body.importe;
            movimiento.activo = req.body.activo;
                
            await movimiento.save();
            res.status(200).send(movimiento);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})

// Actualizar algunos de los datos del cliente
movimientosRouter.patch("/movimientos/:id", async (req, res) => {
    try {
        const movimiento = await Movimiento.findOne({ _id: req.params.id });
        if (movimiento == null) {
            res.sendStatus(404);
        } else {
            if (req.body.cliente_id)
                movimiento.cliente_id = req.body.cliente_id;
            if (req.body.tarjeta_id)
                movimiento.tarjeta_id = req.body.tarjeta_id;
            if (req.body.fecha)
                movimiento.fecha = req.body.fecha;
            if (req.body.descripcion)
                movimiento.descripcion = req.body.descripcion;
            if (req.body.importe)
                movimiento.importe = req.body.importe;
            if (req.body.activo)
                movimiento.activo = req.body.activo;
            
            await movimiento.save();
            res.status(200).send(movimiento);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})

// Eliminar un cliente devolviendo el documento eliminado
movimientosRouter.delete("/movimientos/:id", async (req, res) => {
    try {
        const movimiento = await Movimiento.findOne({ _id: req.params.id });
        if (movimiento == null) {
            res.sendStatus(404);
        } else {
            await Movimiento.deleteOne({ _id: req.params.id });
            res.status(200).send(movimiento);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})


module.exports = movimientosRouter