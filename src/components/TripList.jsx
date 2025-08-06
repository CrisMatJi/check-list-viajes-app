import { Box, VStack, Heading, Text, SimpleGrid, Card, CardBody, CardHeader, Button, Badge, Flex, Spacer, Spinner, Center } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const TripList = ({ trips, loading }) => {
  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    );
  }
  if (trips.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Heading size="lg" mb={4}>No tienes viajes planificados</Heading>
        <Text mb={6}>Comienza creando tu primer viaje y organiza todo lo que necesitas llevar</Text>
        <Button as={RouterLink} to="/new" colorScheme="teal" size="lg">
          Crear mi primer viaje
        </Button>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={2}>Mis Viajes</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {trips.map(trip => {
          const completedItems = trip.items ? trip.items.filter(item => item.checked).length : 0;
          const totalItems = trip.items ? trip.items.length : 0;
          
          return (
            <Card key={trip.id} borderRadius="lg" overflow="hidden" variant="outline">
              <CardHeader bg="teal.50" py={3}>
                <Flex align="center">
                  <Heading size="md">{trip.destination}</Heading>
                  <Spacer />
                  <Badge colorScheme={trip.status === 'upcoming' ? 'green' : 'gray'}>
                    {trip.startDate}
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text mb={3}>{trip.description || 'Sin descripción'}</Text>
                <Text fontSize="sm" mb={4}>
                  {totalItems > 0 ? `${completedItems}/${totalItems} items completados` : 'No hay items en la lista'}
                </Text>
                <Button as={RouterLink} to={`/trip/${trip.id}`} colorScheme="teal" size="sm" width="full">
                  Ver detalles
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default TripList;