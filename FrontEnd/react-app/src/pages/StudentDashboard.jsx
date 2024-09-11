// src/pages/StudentDashboard.jsx
import {
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
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
        Bienvenido, Estudiante
      </Heading>
      <Text color="gray.600" mb={8}>
        Accede a tus tareas, calificaciones y perfil desde aquí.
      </Text>
      <Flex
        direction={isMobile ? "column" : "row"}
        wrap="wrap"
        justify="center" // Centra los elementos en el contenedor Flex
        gap={4}
      >
        <ChakraLink
          as={Link}
          to="/view-assignments"
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
              Ver Tareas
            </Heading>
            <Text mb={4}>Consulta y completa tus tareas asignadas.</Text>
          </Box>
        </ChakraLink>
        <ChakraLink as={Link} to="/view-grades" _hover={{ textDecor: "none" }}>
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
              Ver Calificaciones
            </Heading>
            <Text mb={4}>
              Revisa tus calificaciones y el progreso académico.
            </Text>
          </Box>
        </ChakraLink>
        <ChakraLink as={Link} to="/profile" _hover={{ textDecor: "none" }}>
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
              Perfil
            </Heading>
            <Text mb={4}>Edita tu perfil y configura tu cuenta.</Text>
          </Box>
        </ChakraLink>
      </Flex>
      <Button mt={8} colorScheme="red" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Container>
  );
};

export default StudentDashboard;
