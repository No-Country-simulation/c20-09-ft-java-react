import {
  Box,
  Button,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";

const ViewEvaluations = () => {
  // Datos de ejemplo, puedes reemplazar esto con tus datos reales
  const studentInfo = {
    name: "Yo soy",
    lastName: "Groot",
    dni: "0303456",
  };

  const evaluations = [
    {
      year: "3º",
      trimester: "Primero",
      subject: "Matemáticas",
      feedback:
        "Buena comprensión, pero necesita practicar más ejercicios de la unidad 2.",
    },
    {
      year: "3º",
      trimester: "Primero",
      subject: "Lengua y Literatura",
      feedback: "Excelente progreso, sigue practicando la lectura diaria.",
    },
    {
      year: "3º",
      trimester: "Primero",
      subject: "Historia",
      feedback:
        "Necesita mejorar la participación en clase y profundizar en las unidades 1, 2 y 3.",
    },
    {
      year: "3º",
      trimester: "Primero",
      subject: "Educación Física",
      feedback: "Excelente rendimiento, continúa así!",
    },
  ];

  // Responsividad
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="container.lg" py={6}>
      <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="orange.400">
          Informe de Evaluaciones
        </Heading>

        {/* Información del Estudiante en una sola línea */}
        <Flex
          mb={6}
          direction={isMobile ? "column" : "row"}
          align={isMobile ? "flex-start" : "center"}
          justify={isMobile ? "flex-start" : "space-between"}
          wrap={isMobile ? "wrap" : "nowrap"}
        >
          <Text>
            <strong>Nombre:</strong> {studentInfo.name}
          </Text>
          <Text>
            <strong>Apellido:</strong> {studentInfo.lastName}
          </Text>
          <Text>
            <strong>DNI:</strong> {studentInfo.dni}
          </Text>
        </Flex>

        {/* Tabla de Evaluaciones */}
        <Table
          variant="striped"
          colorScheme="orange"
          size={isMobile ? "sm" : "md"}
        >
          <Thead bg="orange.400" color="white">
            <Tr>
              <Th>Año</Th>
              <Th>Trimestre</Th>
              <Th>Materia</Th>
              <Th>Retroalimentación</Th>
            </Tr>
          </Thead>
          <Tbody>
            {evaluations.map((evaluation, index) => (
              <Tr key={index}>
                <Td>{evaluation.year}</Td>
                <Td>{evaluation.trimester}</Td>
                <Td>{evaluation.subject}</Td>
                <Td>{evaluation.feedback}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default ViewEvaluations;
