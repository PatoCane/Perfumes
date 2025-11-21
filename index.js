// index.js

import express from 'express';
// Importa el router de perfumes
import perfumesRouter from './routes/perfumes.js'; 


const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
// ... CORS (si lo instalaste) ...

// RUTA RAÍZ
app.get('/', (req, res) => {
    res.send('API de Perfumes: ¡Rutas modularizadas!');
});

// CONECTA EL ROUTER: Ahora todas las rutas en perfumes.js son accesibles a través de /api/perfumes
app.use('/api/perfumes', perfumesRouter); 


// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});