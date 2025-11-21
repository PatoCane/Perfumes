import { Router } from 'express';

// Crea una instancia del router de Express
const router = Router();

// Base de datos simulada (En la vida real, esta sería tu conexión a MongoDB/PostgreSQL)
let perfumes = [
    { id: 1, nombre: 'Aura Fresca', marca: 'PerfumeCorp', precio: 50.99 },
    { id: 2, nombre: 'Noche Mística', marca: 'EsenciaLux', precio: 75.50 }
];

// Función utilitaria para encontrar el índice o el objeto por ID
const findPerfume = (id) => perfumes.find(p => p.id === id);
const findPerfumeIndex = (id) => perfumes.findIndex(p => p.id === id);

// --- RUTAS DE PERFUMES ---

// 1. OBTENER TODOS los Perfumes (GET /)
router.get('/', (req, res) => {
    // Devuelve la lista completa
    res.json(perfumes);
});

// 2. OBTENER un Perfume por ID (GET /:id)
router.get('/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const perfume = findPerfume(idBuscado);

    if (!perfume) {
        // 404 Not Found si no se encuentra
        return res.status(404).json({ message: 'Perfume no encontrado.' });
    }
    res.json(perfume);
});

// 3. CREAR un nuevo Perfume (POST /)
router.post('/', (req, res) => {
    
    const { nombre, marca, precio } = req.body;
    
    // Validación de campos obligatorios
    if (!nombre || !marca) {
        return res.status(400).send('Se requieren el nombre y la marca del perfume.');
    }

    // Validación y conversión del precio
    let precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).send('El precio debe ser un número positivo.');
    }

    // Creación del recurso
    const nuevoPerfume = {
        id: perfumes.length > 0 ? Math.max(...perfumes.map(p => p.id)) + 1 : 1, // ID autoincremental más robusto
        nombre: nombre,
        marca: marca,
        precio: precioNumerico
    };

    perfumes.push(nuevoPerfume);
    
    // 201 Created y retorna el nuevo recurso
    res.status(201).json(nuevoPerfume); 
});

// 4. ACTUALIZAR un Perfume (PUT /:id)
router.put('/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const perfume = findPerfume(idBuscado);

    // 404 Not Found
    if (!perfume) {
        return res.status(404).json({ message: `Perfume con ID ${idBuscado} no encontrado para actualizar.` });
    }

    // Desestructuración y Validación
    const { nombre, marca, precio } = req.body;

    if (!nombre || !marca) {
        return res.status(400).send('Se requieren el nombre y la marca para la actualización.');
    }
    
    let precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).send('El precio debe ser un número positivo.');
    }

    // Aplicar la actualización
    perfume.nombre = nombre;
    perfume.marca = marca;
    perfume.precio = precioNumerico; 
    
    // 200 OK y retorna el recurso actualizado
    res.json(perfume); 
});

// 5. ELIMINAR un Perfume (DELETE /:id)
router.delete('/:id', (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const index = findPerfumeIndex(idBuscado);

    // 404 Not Found
    if (index === -1) {
        return res.status(404).json({ message: `Perfume con ID ${idBuscado} no encontrado.` });
    }

    // Eliminar el perfume
    const perfumeEliminado = perfumes.splice(index, 1);

    // 200 OK y retorna el objeto eliminado (o 204 No Content)
    res.json(perfumeEliminado[0]); 
});


// Exporta el router para que index.js pueda usarlo
export default router;