// src/pages/ParentDashboard.jsx
import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
  Link as ChakraLink,
  Container,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    // Elimina el token del almacenamiento local y redirige al usuario al inicio de sesión
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container
      maxW="container.lg"
      p={8}
      bg="gray.50"
      borderRadius="md"
      boxShadow="md"
      mt={4}
      textAlign="center"
    >
      <Heading color="teal.600" mb={6}>
        Dashboard del Padre
      </Heading>
      <Text color="gray.600" mb={8}>
        Administra y revisa la información relacionada con tus hijos desde aquí.
      </Text>
      <Flex
        direction={isMobile ? "column" : "row"}
        wrap="wrap"
        justify="center" // Centra los elementos en el contenedor Flex
        gap={4}
      >
        <ChakraLink
          as={Link}
          to="/view-children"
          _hover={{ textDecor: "none" }}
        >
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            maxW="200px" // Limita el ancho máximo de cada tarjeta
            textAlign="center" // Centra el texto dentro de cada tarjeta
            mx="auto" // Centra cada tarjeta horizontalmente
          >
            <Heading size="md" color="teal.600" mb={2}>
              Ver Hijos
            </Heading>
            <Text mb={4}>
              Consulta la información de tus hijos y su progreso académico.
            </Text>
          </Box>
        </ChakraLink>
        <ChakraLink as={Link} to="/view-reports" _hover={{ textDecor: "none" }}>
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            maxW="200px" // Limita el ancho máximo de cada tarjeta
            textAlign="center" // Centra el texto dentro de cada tarjeta
            mx="auto" // Centra cada tarjeta horizontalmente
          >
            <Heading size="md" color="teal.600" mb={2}>
              Ver Reportes
            </Heading>
            <Text mb={4}>
              Revisa los reportes de rendimiento y asistencia de tus hijos.
            </Text>
          </Box>
        </ChakraLink>
        <ChakraLink
          as={Link}
          to="/communication"
          _hover={{ textDecor: "none" }}
        >
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            maxW="200px" // Limita el ancho máximo de cada tarjeta
            textAlign="center" // Centra el texto dentro de cada tarjeta
            mx="auto" // Centra cada tarjeta horizontalmente
          >
            <Heading size="md" color="teal.600" mb={2}>
              Comunicación con Profesores
            </Heading>
            <Text mb={4}>
              Envía y recibe mensajes de los profesores de tus hijos.
            </Text>
          </Box>
        </ChakraLink>
      </Flex>
      <Button mt={8} colorScheme="red" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Container>
  );
};

export default ParentDashboard;
