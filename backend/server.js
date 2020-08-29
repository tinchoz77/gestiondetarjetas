const express = require('express');
const moment     = require('moment');

// cargar rutas
const clientesRoutes = require('./routes/clientesRouter');
const tarjetasRoutes = require('./routes/tarjetasRouter');

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
app.use('/api', clientesRoutes);
app.use('/api', tarjetasRoutes);

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


