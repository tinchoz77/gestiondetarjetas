const express = require('express');
const moment     = require('moment');
const bodyParser = require('body-parser');

// cargar servicios
const clientesService = require('./services/clientesService.js');
const tarjetasService = require('./services/tarjetasService.js');
const movimientosService = require('./services/movimientosService.js');

// crear la aplicación
const app = express();
app.use(bodyParser.json());

// log de todos los request recibidos
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);
    next();
});

// página de bienvenida
app.get('/', async (req, res) => {
    res.send(
        `<html>
            <head>
                <title>backend</title>
            </head>
            <body>
                <h1>El backend está funcionando!</h1>
            </body>
        </html>`
    );
});

// Clientes
app.get('/api/clientes', async(req, res) => {
    res.status(503).end();
})

app.post('/api/clientes', async(req, res) => {
    clientesService.add(req.body);
    //TODO: devolver el cliente recién creado
    res.status(201).end();
})

app.put('/api/clientes', async(req, res) => {
    res.status(503).end();
})

app.patch('/api/clientes', async(req, res) => {
    res.status(503).end();
})

app.delete('/api/clientes', async(req, res) => {
    res.status(503).end();
})

// Tarjetas
app.get('/api/tarjetas', async(req, res) => {
    res.status(503).end();
})

app.post('/api/tarjetas', async(req, res) => {
    res.status(503).end();
})

app.put('/api/tarjetas', async(req, res) => {
    res.status(503).end();
})

app.patch('/api/tarjetas', async(req, res) => {
    res.status(503).end();
})

app.delete('/api/tarjetas', async(req, res) => {
    res.status(503).end();
})

// Movimientos
app.get('/api/movimientos', async(req, res) => {
    res.status(503).end();
})

app.post('/api/movimientos', async(req, res) => {
    res.status(503).end();
})

app.put('/api/movimientos', async(req, res) => {
    res.status(503).end();
})

app.patch('/api/movimientos', async(req, res) => {
    res.status(503).end();
})

app.delete('/api/movimientos', async(req, res) => {
    res.status(503).end();
})

// arrancar el server
app.listen(process.env.PORT || 3000, function () {
    console.log('backend online');
});


