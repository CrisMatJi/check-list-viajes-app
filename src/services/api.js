const API_URL = 'http://localhost:5000/api';

// Función para manejar errores de fetch
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ocurrió un error en la solicitud');
  }
  return response.json();
};

// Obtener todos los viajes de una familia
export const getTripsByFamily = async (familyId) => {
  const response = await fetch(`${API_URL}/trips/family/${familyId}`);
  return handleResponse(response);
};

// Obtener un viaje específico
export const getTripById = async (tripId) => {
  const response = await fetch(`${API_URL}/trips/${tripId}`);
  return handleResponse(response);
};

// Crear un nuevo viaje
export const createTrip = async (tripData) => {
  const response = await fetch(`${API_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });
  return handleResponse(response);
};

// Actualizar un viaje
export const updateTrip = async (tripId, tripData) => {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });
  return handleResponse(response);
};

// Eliminar un viaje
export const deleteTrip = async (tripId) => {
  const response = await fetch(`${API_URL}/trips/${tripId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// Añadir un item a la lista de un viaje
export const addItem = async (tripId, itemData) => {
  const response = await fetch(`${API_URL}/trips/${tripId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
};

// Actualizar un item de la lista
export const updateItem = async (tripId, itemId, itemData) => {
  const response = await fetch(`${API_URL}/trips/${tripId}/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
};

// Eliminar un item de la lista
export const deleteItem = async (tripId, itemId) => {
  const response = await fetch(`${API_URL}/trips/${tripId}/items/${itemId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};