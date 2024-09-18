import React, { useEffect, useState } from "react";
import { getEvaluationsByDni } from "../../services/teacherService";
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
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentInfo, setStudentInfo] = useState({});

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // Leer el DNI desde sessionStorage
    const dni = sessionStorage.getItem("dni");
    const name = sessionStorage.getItem("name");

    if (dni) {
      setStudentInfo({ name, dni });
    }

    const fetchEvaluations = async () => {
      if (dni) {
        try {
          const data = await getEvaluationsByDni(dni);
          console.log("Data received:", data);
          setEvaluations(data);
        } catch (error) {
          console.error("Error fetching evaluations:", error);
          setError(error.message || "Error al obtener las evaluaciones");
        } finally {
          setLoading(false);
        }
      } else {
        setError("DNI no encontrado en sessionStorage.");
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

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
