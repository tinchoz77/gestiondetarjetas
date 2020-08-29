const express = require("express")
const Cliente = require("../models/Cliente")
const clientesRouter = express.Router()

// Obtener todos los clientes
clientesRouter.get("/clientes", async (req, res) => {
    const clientes = await Cliente.find()
    res.status(200).send(clientes);
})

// Obtener un cliente particular
clientesRouter.get("/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ _id: req.params.id });
        if (cliente == null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(cliente);
        }
        
    } catch(CastError) {
        res.sendStatus(404);
    }
  })

// Crear un nuevo cliente
clientesRouter.post("/clientes", async (req, res) => {
    const cliente = new Cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        activo: req.body.activo,
    })
    await cliente.save();
    res.statusCode = 201;
    res.send(cliente);
})

// Actualizar todos los datos del cliente
clientesRouter.put("/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ _id: req.params.id });
        if (cliente == null) {
            res.sendStatus(404);
        } else {
            cliente.nombre = req.body.nombre;
            cliente.apellido = req.body.apellido;
            cliente.email = req.body.email;
            cliente.activo = req.body.activo;
            
            await cliente.save();
            res.status(200).send(cliente);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})

// Actualizar algunos de los datos del cliente
clientesRouter.patch("/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ _id: req.params.id });
        if (cliente == null) {
            res.sendStatus(404);
        } else {
            if (req.body.nombre)
                cliente.nombre = req.body.nombre;
            if (req.body.apellido)
                cliente.apellido = req.body.apellido;
            if (req.body.email)
                cliente.email = req.body.email;
            if (req.body.activo)
                cliente.activo = req.body.activo;
            
            await cliente.save();
            res.status(200).send(cliente);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})

// Eliminar un cliente devolviendo el documento eliminado
clientesRouter.delete("/clientes/:id", async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ _id: req.params.id });
        if (cliente == null) {
            res.sendStatus(404);
        } else {
            await Cliente.deleteOne({ _id: req.params.id });
            res.status(200).send(cliente);
        }
    } catch(CastError) {
        res.sendStatus(404);
    }
})


module.exports = clientesRouter