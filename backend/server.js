const express = require('express');
const moment     = require('moment');
const routes = require('./routes');

// cargar servicios
const clientesService = require('./services/clientesService.js');
const tarjetasService = require('./services/tarjetasService.js');
const movimientosService = require('./services/movimientosService.js');

// conectarse con la bd
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/gestiondetarjetas", { useNewUrlParser: true , useUnifiedTopology: true });

// crear la aplicación
const app = express();
app.use(express.json());

// log de todos los request recibidos
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path} - ${moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS)}`);
    next();
});

// instalar las rutas
app.use('/api', routes);

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

// arrancar el server
app.listen(process.env.PORT || 3000, function () {
    console.log('backend online');
});


