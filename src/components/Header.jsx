import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="teal.500" px={4} py={3} shadow="md">
      <Flex maxW="container.md" mx="auto" align="center">
        <Heading as={RouterLink} to="/" size="lg" color="white" _hover={{ textDecoration: 'none' }}>
          CheckList Viajes
        </Heading>
        <Spacer />
        <Button
          as={RouterLink}
          to="/new"
          colorScheme="whiteAlpha"
          size="sm"
        >
          Nuevo Viaje
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;