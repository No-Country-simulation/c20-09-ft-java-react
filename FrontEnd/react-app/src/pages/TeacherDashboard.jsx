// src/pages/TeacherDashboard.jsx
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    // Elimina el token del almacenamiento local y redirige al usuario al inicio de sesión
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      textAlign="center"
      bg="gray.50"
      p={8}
      borderRadius="md"
      boxShadow="md"
      maxW="800px"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading color="blue.600" mb={4}>
        Bienvenido, Profesor
      </Heading>
      <Text color="gray.600" mb={8}>
        Administra tus clases, estudiantes y tareas desde aquí.
      </Text>
      <Flex
        direction={isMobile ? "column" : "row"}
        wrap="wrap"
        justify="center" // Centra los elementos en el contenedor Flex
        gap={4}
        maxW="100%" // Asegura que el contenido no se extienda más allá del contenedor
      >
        <Link href="/academic-history" _hover={{ textDecor: "none" }}>
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
            {/* <Image
              src="https://via.placeholder.com/200"
              alt="Historial Académico"
              borderRadius="md"
              mb={2}
            /> */}
            <Text fontWeight="bold" color="blue.600">
              Historial Académico
            </Text>
            <Text mb={4}>
              Consulta el historial académico de tus estudiantes.
            </Text>
          </Box>
        </Link>
        <Link href="/performance" _hover={{ textDecor: "none" }}>
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
            {/* <Image
              src="https://via.placeholder.com/200"
              alt="Rendimiento"
              borderRadius="md"
              mb={2}
            /> */}
            <Text fontWeight="bold" color="blue.600">
              Rendimiento
            </Text>
            <Text mb={4}>
              Monitorea el rendimiento académico de tus estudiantes.
            </Text>
          </Box>
        </Link>
        <Link href="/messages" _hover={{ textDecor: "none" }}>
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
            {/* <Image
              src="https://via.placeholder.com/200"
              alt="Mensajes"
              borderRadius="md"
              mb={2}
            /> */}
            <Text fontWeight="bold" color="blue.600">
              Mensajes
            </Text>
            <Text mb={4}>
              Revisa y envía mensajes a estudiantes y otros profesores.
            </Text>
          </Box>
        </Link>
      </Flex>
      <Button mt={8} colorScheme="red" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default TeacherDashboard;
