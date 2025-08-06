import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

const NewTrip = ({ addTrip }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.destination) newErrors.destination = 'El destino es obligatorio';
    if (!formData.startDate) newErrors.startDate = 'La fecha de inicio es obligatoria';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        
        const result = await addTrip({
          ...formData,
          status: 'upcoming',
          createdAt: new Date().toISOString(),
        });
        
        if (result) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error al crear viaje:', error);
        toast({
          title: 'Error al crear viaje',
          description: 'No se pudo crear el viaje. Por favor intenta de nuevo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: 'Error en el formulario',
        description: 'Por favor completa todos los campos obligatorios',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Nuevo Viaje</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={errors.destination}>
            <FormLabel>Destino</FormLabel>
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="¿A dónde vas?"
            />
            {errors.destination && (
              <FormErrorMessage>{errors.destination}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={errors.startDate}>
            <FormLabel>Fecha de inicio</FormLabel>
            <Input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && (
              <FormErrorMessage>{errors.startDate}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Fecha de regreso</FormLabel>
            <Input
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detalles sobre tu viaje..."
              rows={3}
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit" isLoading={isSubmitting}>
            Crear Viaje
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default NewTrip;