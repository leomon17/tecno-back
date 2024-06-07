import express, { Application } from 'express';

import { UnidadController, unitRouter } from '../modules/unidades/adapter/unidadController';

require('dotenv').config();

//Configuración de Express para Rutas
const app: Application = express();
const cors = require('cors');
app.set('port', process.env.PORT || 3000);
//middlewares, permite Peticiones.
app.use(
    cors({
      origin: '*',
    })
  );
app.use(express.json({ limit: '50mb' }));


//routes
app.get('/', (req, res) => {
    res.send('<h1>Backend</h1>');
});

//Rutas de Units
app.use('/unidades', unitRouter);

//export
export default app;