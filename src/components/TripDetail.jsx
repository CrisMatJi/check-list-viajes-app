import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Input,
  Checkbox,
  IconButton,
  Flex,
  Spacer,
  Badge,
  Divider,
  useToast,
  Progress,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons';

// Servicios
import { getTripById, addItem as apiAddItem, updateItem as apiUpdateItem, deleteItem as apiDeleteItem } from '../services/api';

const TripDetail = ({ trips, setTrips, familyId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [trip, setTrip] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        // Primero intentamos encontrar el viaje en el estado local
        const foundTrip = trips.find(t => t._id === id);
        
        if (foundTrip) {
          setTrip(foundTrip);
          
          // Calcular progreso
          if (foundTrip.items && foundTrip.items.length > 0) {
            const completed = foundTrip.items.filter(item => item.checked).length;
            setProgress((completed / foundTrip.items.length) * 100);
          }
        } else {
          // Si no está en el estado local, lo buscamos en la API
          const tripData = await getTripById(id);
          setTrip(tripData);
          
          // Calcular progreso
          if (tripData.items && tripData.items.length > 0) {
            const completed = tripData.items.filter(item => item.checked).length;
            setProgress((completed / tripData.items.length) * 100);
          }
        }
      } catch (error) {
        console.error('Error al cargar el viaje:', error);
        toast({
          title: 'Error',
          description: 'No se pudo cargar el viaje. Por favor intenta de nuevo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    if (familyId) {
      fetchTrip();
    } else {
      navigate('/');
    }
  }, [id, trips, navigate, familyId]);

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    );
  }
  
  if (!trip) return null;

  const addItem = async () => {
    if (!newItem.trim()) return;
    
    try {
      setSaving(true);
      
      // Llamar a la API para añadir el item
      const updatedTrip = await apiAddItem(trip._id, { text: newItem });
      
      // Actualizar el viaje en el estado local
      setTrip(updatedTrip);
      
      // Actualizar el viaje en el estado global
      const updatedTrips = trips.map(t => t._id === id ? updatedTrip : t);
      setTrips(updatedTrips);
      
      // Calcular progreso
      if (updatedTrip.items && updatedTrip.items.length > 0) {
        const completed = updatedTrip.items.filter(item => item.checked).length;
        setProgress((completed / updatedTrip.items.length) * 100);
      }
      
      setNewItem('');
      
      toast({
        title: 'Item añadido',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al añadir item:', error);
      toast({
        title: 'Error',
        description: 'No se pudo añadir el item. Por favor intenta de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleItem = async (itemId) => {
    try {
      setSaving(true);
      
      // Encontrar el item y su estado actual
      const item = trip.items.find(item => item._id === itemId);
      const newCheckedState = !item.checked;
      
      // Llamar a la API para actualizar el item
      const updatedTrip = await apiUpdateItem(trip._id, itemId, { checked: newCheckedState });
      
      // Actualizar progreso
      if (updatedTrip.items && updatedTrip.items.length > 0) {
        const completed = updatedTrip.items.filter(item => item.checked).length;
        setProgress((completed / updatedTrip.items.length) * 100);
      }
      
      // Actualizar el viaje en el estado local
      setTrip(updatedTrip);
      
      // Actualizar el viaje en el estado global
      const updatedTrips = trips.map(t => t._id === id ? updatedTrip : t);
      setTrips(updatedTrips);
    } catch (error) {
      console.error('Error al actualizar item:', error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el item. Por favor intenta de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      setSaving(true);
      
      // Llamar a la API para eliminar el item
      const updatedTrip = await apiDeleteItem(trip._id, itemId);
      
      // Actualizar progreso
      if (updatedTrip.items && updatedTrip.items.length > 0) {
        const completed = updatedTrip.items.filter(item => item.checked).length;
        setProgress((completed / updatedTrip.items.length) * 100);
      } else {
        setProgress(0);
      }
      
      // Actualizar el viaje en el estado local
      setTrip(updatedTrip);
      
      // Actualizar el viaje en el estado global
      const updatedTrips = trips.map(t => t._id === id ? updatedTrip : t);
      setTrips(updatedTrips);
      
      toast({
        title: 'Item eliminado',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error al eliminar item:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el item. Por favor intenta de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <Box>
      <Button 
        leftIcon={<ArrowBackIcon />} 
        variant="ghost" 
        mb={4} 
        onClick={() => navigate('/')}
      >
        Volver a la lista
      </Button>
      
      <Card mb={6} variant="outline">
        <CardHeader bg="teal.50" py={3}>
          <Heading size="lg">{trip.destination}</Heading>
        </CardHeader>
        <CardBody>
          <HStack mb={2}>
            <Badge colorScheme="teal">Fecha: {trip.startDate}</Badge>
            {trip.endDate && (
              <Badge colorScheme="blue">Hasta: {trip.endDate}</Badge>
            )}
          </HStack>
          
          {trip.description && (
            <Text mt={2} mb={4}>{trip.description}</Text>
          )}
          
          <Progress 
            value={progress} 
            colorScheme="teal" 
            size="sm" 
            borderRadius="md" 
            mb={2}
          />
          <Text fontSize="sm" textAlign="right">
            {trip.items.filter(item => item.checked).length}/{trip.items.length} completados
          </Text>
        </CardBody>
      </Card>

      <Heading size="md" mb={4}>Lista de elementos</Heading>
      
      <HStack mb={6}>
        <Input
          placeholder="Añadir nuevo elemento..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          icon={<AddIcon />}
          colorScheme="teal"
          onClick={addItem}
          aria-label="Añadir elemento"
          isLoading={saving}
        />
      </HStack>

      <VStack align="stretch" spacing={2} divider={<Divider />}>
        {trip.items.length === 0 ? (
          <Text color="gray.500" textAlign="center" py={4}>
            No hay elementos en la lista. ¡Añade algunos!
          </Text>
        ) : (
          trip.items.map(item => (
            <Flex key={item.id} align="center">
              <Checkbox
                isChecked={item.checked}
                onChange={() => toggleItem(item.id)}
                size="lg"
                colorScheme="teal"
              >
                <Text
                  textDecoration={item.checked ? 'line-through' : 'none'}
                  color={item.checked ? 'gray.500' : 'inherit'}
                >
                  {item.text}
                </Text>
              </Checkbox>
              <Spacer />
              <IconButton
                icon={<DeleteIcon />}
                variant="ghost"
                colorScheme="red"
                size="sm"
                onClick={() => deleteItem(item.id)}
                aria-label="Eliminar elemento"
              />
            </Flex>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default TripDetail;