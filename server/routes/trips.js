const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Obtener todos los viajes de una familia
router.get('/family/:familyId', tripController.getTripsByFamily);

// Obtener un viaje específico
router.get('/:id', tripController.getTripById);

// Crear un nuevo viaje
router.post('/', tripController.createTrip);

// Actualizar un viaje
router.put('/:id', tripController.updateTrip);

// Eliminar un viaje
router.delete('/:id', tripController.deleteTrip);

// Añadir un item a la lista de un viaje
router.post('/:id/items', tripController.addItem);

// Actualizar un item de la lista
router.put('/:id/items/:itemId', tripController.updateItem);

// Eliminar un item de la lista
router.delete('/:id/items/:itemId', tripController.deleteItem);

module.exports = router;