import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const FamilyLogin = ({ setFamilyId }) => {
  const [familyCode, setFamilyCode] = useState('');
  const [savedFamilyId, setSavedFamilyId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Verificar si ya hay un ID de familia guardado
    const storedFamilyId = localStorage.getItem('familyId');
    if (storedFamilyId) {
      setSavedFamilyId(storedFamilyId);
      setFamilyId(storedFamilyId);
    } else {
      // Si no hay ID guardado, abrir el modal
      onOpen();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!familyCode.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa un código de familia',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Guardar el ID de familia en localStorage y en el estado
    localStorage.setItem('familyId', familyCode);
    setFamilyId(familyCode);
    setSavedFamilyId(familyCode);
    
    toast({
      title: 'Conectado',
      description: `Te has conectado a la familia con código: ${familyCode}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    onClose();
  };

  const handleChangeFamilyId = () => {
    onOpen();
  };

  return (
    <>
      {savedFamilyId && (
        <Box textAlign="center" mb={4}>
          <Text fontSize="sm" color="gray.600">
            Familia: {savedFamilyId}
            <Button
              size="xs"
              variant="link"
              colorScheme="teal"
              ml={2}
              onClick={handleChangeFamilyId}
            >
              Cambiar
            </Button>
          </Text>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Conectar con tu familia</ModalHeader>
          {savedFamilyId && <ModalCloseButton />}
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Text>
                  Para compartir tus listas de viaje con tu familia, necesitas un código de familia.
                  Todos los miembros de la familia deben usar el mismo código.
                </Text>
                <FormControl isRequired>
                  <FormLabel>Código de familia</FormLabel>
                  <Input
                    value={familyCode}
                    onChange={(e) => setFamilyCode(e.target.value)}
                    placeholder="Ingresa un código único para tu familia"
                  />
                </FormControl>
                <Button type="submit" colorScheme="teal" width="full">
                  {savedFamilyId ? 'Cambiar familia' : 'Conectar'}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FamilyLogin;