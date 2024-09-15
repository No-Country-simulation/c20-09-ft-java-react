import React, { useEffect, useState } from "react";
import { getEvaluationsByDni } from "../../services/teacherService"; // Asegúrate de que esta ruta sea correcta
import {
  Box,
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
  const studentInfo = {
    name: "Yo soy",
    lastName: "Groot",
    dni: "12222222",
  };

  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await getEvaluationsByDni(studentInfo.dni);
        console.log("Data received:", data); // Verifica los datos recibidos
        setEvaluations(data);
      } catch (error) {
        console.error("Error fetching evaluations:", error); // Manejo de errores detallado
        setError(error.message || "Error al obtener las evaluaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, [studentInfo.dni]);

  return (
    <Container maxW="container.lg" py={6}>
      <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="orange.400">
          Informe de Evaluaciones
        </Heading>

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

        {loading && <Text textAlign="center">Cargando evaluaciones...</Text>}
        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        {!loading && !error && evaluations.length > 0 && (
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
        )}
        {!loading && !error && evaluations.length === 0 && (
          <Text textAlign="center">No hay evaluaciones para mostrar.</Text>
        )}
      </Box>
    </Container>
  );
};

export default ViewEvaluations;
