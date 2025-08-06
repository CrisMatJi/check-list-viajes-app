import { useState, useEffect } from 'react'
import { Box, Container, useToast } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Componentes
import Header from './components/Header'
import TripList from './components/TripList'
import TripDetail from './components/TripDetail'
import NewTrip from './components/NewTrip'
import FamilyLogin from './components/FamilyLogin'

// Servicios
import { getTripsByFamily, createTrip } from './services/api'

function App() {
  const [trips, setTrips] = useState([])
  const [familyId, setFamilyId] = useState(localStorage.getItem('familyId') || '')
  const [loading, setLoading] = useState(true)
  
  const toast = useToast()

  // Cargar viajes desde el backend cuando cambia el familyId
  useEffect(() => {
    const fetchTrips = async () => {
      if (!familyId) {
        setTrips([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await getTripsByFamily(familyId)
        setTrips(data)
      } catch (error) {
        console.error('Error al cargar viajes:', error)
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los viajes. Por favor intenta de nuevo.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [familyId, toast])

  const addTrip = async (newTrip) => {
    try {
      const tripData = {
        ...newTrip,
        familyId,
      }
      
      const savedTrip = await createTrip(tripData)
      setTrips([...trips, savedTrip])
      
      toast({
        title: 'Viaje creado',
        description: `Tu viaje a ${newTrip.destination} ha sido creado`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      return savedTrip
    } catch (error) {
      console.error('Error al crear viaje:', error)
      toast({
        title: 'Error',
        description: 'No se pudo crear el viaje. Por favor intenta de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return null
    }
  }

  return (
    <Router>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <FamilyLogin setFamilyId={setFamilyId} />
        <Container maxW="container.md" py={8}>
          <Routes>
            <Route path="/" element={<TripList trips={trips} loading={loading} />} />
            <Route path="/trip/:id" element={<TripDetail trips={trips} setTrips={setTrips} familyId={familyId} />} />
            <Route path="/new" element={<NewTrip addTrip={addTrip} />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App
