const express = require("express")
const Movimiento = require("../models/Movimiento")
const Tarjeta = require("../models/Tarjeta")
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
movimientosRouter.post("/clientes/:id_cliente/tarjetas/:id_tarjeta/movimientos", async (req, res) => {
    const movimiento = new Movimiento({
        cliente: req.params.id_cliente,
        tarjeta: req.params.id_tarjeta,
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
    res.header("Accept", "GET,POST,PATCH").sendStatus(405);
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
movimientosRouter.get("/clientes/:id_cliente/tarjetas/:id_tarjeta/movimientos", async (req, res) => {
    const movimientos = await Movimiento.find({ tarjeta: req.params.id_tarjeta });
    if (!movimientos.length) {
        res.sendStatus(404);
    } else {
        res.status(200).send(movimientos);
    }
})

// Obtener los movimientos de un cliente para un período agrupados por tarjeta activa
movimientosRouter.get("/clientes/:id_cliente/resumen", async (req, res) => {
    const periodo = req.query.periodo;
    if (periodo == null || !(/^[0-9]{4}-[0-9]{1,2}$/.test(periodo)))     {
        res.sendStatus(400);
    } else {
        const tarjetas = await Tarjeta.find({ cliente: req.params.id_cliente, activo: true});
        if (!tarjetas.length) {
            res.sendStatus(404);
        } else {
            const resumen = [];
            for(let i=0; i<tarjetas.length; i++){
                const movimientos = await Movimiento.find({ tarjeta: tarjetas[i].id });
                const movimientosFiltrados = [];
                for(let j=0; j<movimientos.length; j++) {
                    if (movimientos[j].periodo == periodo) {
                        movimientosFiltrados.push({
                            fecha: movimientos[j].fecha,
                            descripcion: movimientos[j].descripcion,
                            importe: movimientos[j].importe
                        })
                    }
                }
                resumen.push({ tarjeta: tarjetas[i].numero,
                    movimientos: movimientosFiltrados.sort((a,b) => (a.fecha > b.fecha) ? 1 : -1) });
            }
            res.status(200).send(resumen);
        }
    }
})

// No se permite eliminar un movimiento
movimientosRouter.delete("/movimientos/:id", async (req, res) => {
    res.header("Accept", "GET,POST,PATCH").sendStatus(405);
})

module.exports = movimientosRouter