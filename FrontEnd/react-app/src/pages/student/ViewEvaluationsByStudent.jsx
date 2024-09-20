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
import { verifyChildByDni } from "../../services/adminService";

const ViewEvaluationsByStudent = () => {
  const [state, setState] = useState({
    evaluations: [],
    loading: true,
    error: null,
  });
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    dni: "",
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const dni = sessionStorage.getItem("dni");

    if (dni) {
      verifyChildByDni(dni)
        .then((data) => {
          setStudentInfo({
            firstName: data.firstName || "No disponible",
            lastName: data.lastName || "No disponible",
            dni: dni,
          });
          fetchEvaluations(dni);
        })
        .catch((err) => {
          console.error("Error al verificar el DNI:", err);
          setState({
            evaluations: [],
            loading: false,
            error: "Error al verificar el DNI.",
          });
        });
    } else {
      setState({
        evaluations: [],
        loading: false,
        error: "DNI no encontrado en sessionStorage.",
      });
    }
  }, []);

  const fetchEvaluations = async (dni) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const data = await getEvaluationsByDni(dni);
      setState({ evaluations: data, loading: false, error: null });
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      setState({
        evaluations: [],
        loading: false,
        error: error.message || "Error al obtener las evaluaciones",
      });
    }
  };

  return (
    <Container maxW="container.lg" py={6}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="orange.400">
          Informe de Evaluaciones
        </Heading>

        <Box mb={6} p={4} borderWidth={1} borderRadius="md">
          <Flex mb={2} align="center" justify="space-between">
            <Text>
              <strong>Nombre:</strong> {studentInfo.firstName}
            </Text>
            <Text>
              <strong>Apellido:</strong> {studentInfo.lastName}
            </Text>
            <Text>
              <strong>DNI:</strong> {studentInfo.dni}
            </Text>
          </Flex>
        </Box>

        {state.loading && (
          <Text textAlign="center">Cargando evaluaciones...</Text>
        )}
        {state.error && (
          <Text color="red.500" textAlign="center">
            {state.error}
          </Text>
        )}

        {!state.loading && !state.error && state.evaluations.length > 0 && (
          <Table
            variant="simple"
            size={isMobile ? "sm" : "md"}
            boxShadow="md"
            borderWidth={1}
            borderRadius="md"
            overflow="hidden"
          >
            <Thead bg="orange.400">
              <Tr>
                <Th colorScheme="whiteAlpha">Año</Th>
                <Th colorScheme="whiteAlpha">Trimestre</Th>
                <Th colorScheme="whiteAlpha">Materia</Th>
                <Th colorScheme="whiteAlpha">Retroalimentación</Th>
              </Tr>
            </Thead>
            <Tbody bg="white">
              {state.evaluations.map((evaluation) => (
                <Tr key={evaluation.id}>
                  {" "}
                  {/* Cambia 'evaluation.id' por el campo único real */}
                  <Td>{evaluation.year}</Td>
                  <Td>{evaluation.trimester}</Td>
                  <Td>{evaluation.subject}</Td>
                  <Td>{evaluation.feedback}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {!state.loading && !state.error && state.evaluations.length === 0 && (
          <Text textAlign="center">No hay evaluaciones para mostrar.</Text>
        )}
      </Box>
    </Container>
  );
};

export default ViewEvaluationsByStudent;
