const Trip = require('../models/Trip');

// Obtener todos los viajes de una familia
exports.getTripsByFamily = async (req, res) => {
  try {
    const { familyId } = req.params;
    const trips = await Trip.find({ familyId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error('Error al obtener viajes:', error);
    res.status(500).json({ message: 'Error al obtener viajes', error: error.message });
  }
};

// Obtener un viaje específico
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error al obtener viaje:', error);
    res.status(500).json({ message: 'Error al obtener viaje', error: error.message });
  }
};

// Crear un nuevo viaje
exports.createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, description, familyId } = req.body;
    
    if (!destination || !startDate || !familyId) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    
    const newTrip = new Trip({
      destination,
      startDate,
      endDate,
      description,
      familyId,
      items: []
    });
    
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Error al crear viaje:', error);
    res.status(500).json({ message: 'Error al crear viaje', error: error.message });
  }
};

// Actualizar un viaje
exports.updateTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, description, status } = req.body;
    
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { destination, startDate, endDate, description, status },
      { new: true }
    );
    
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    
    res.json(updatedTrip);
  } catch (error) {
    console.error('Error al actualizar viaje:', error);
    res.status(500).json({ message: 'Error al actualizar viaje', error: error.message });
  }
};

// Eliminar un viaje
exports.deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    
    res.json({ message: 'Viaje eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar viaje:', error);
    res.status(500).json({ message: 'Error al eliminar viaje', error: error.message });
  }
};

// Añadir un item a la lista de un viaje
exports.addItem = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'El texto del item es requerido' });
    }
    
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    
    trip.items.push({ text, checked: false });
    const updatedTrip = await trip.save();
    
    res.status(201).json(updatedTrip);
  } catch (error) {
    console.error('Error al añadir item:', error);
    res.status(500).json({ message: 'Error al añadir item', error: error.message });
  }
};

// Actualizar un item de la lista
exports.updateItem = async (req, res) => {
  try {
    const { text, checked } = req.body;
    const { id, itemId } = req.params;
    
    const trip = await Trip.findById(id);
    
    if (!trip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    
    const item = trip.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }
    
    if (text !== undefined) item.text = text;
    if (checked !== undefined) item.checked = checked;
    
    await trip.save();
    
    res.json(trip);
  } catch (error) {
    console.error('Error al actualizar item:', error);
    res.status(500).json({ message: 'Error al actualizar item', error: error.message });
  }
};

// Eliminar un item de la lista
exports.deleteItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    
    // Usar findByIdAndUpdate con $pull para eliminar el item del array
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );
    
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    
    res.json(updatedTrip);
  } catch (error) {
    console.error('Error al eliminar item:', error);
    res.status(500).json({ message: 'Error al eliminar item', error: error.message });
  }
};