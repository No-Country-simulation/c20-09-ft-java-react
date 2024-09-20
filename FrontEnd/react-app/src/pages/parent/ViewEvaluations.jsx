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
import { verifyStudentByParentDni } from "../../services/teacherService"; // Asegúrate de que la ruta sea correcta

const ViewEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    studentDni: "", // Cambiado el nombre de dni a studentDni
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const dniParent = sessionStorage.getItem("dni"); // Cambiado a dniParent

    if (dniParent) {
      // Verificando dniParent
      verifyStudentByParentDni(dniParent) // Usando dniParent aquí
        .then((data) => {
          console.log("Datos del estudiante:", data); // Consola para verificar los datos
          setStudentInfo({
            firstName: data.firstName || "No disponible",
            lastName: data.lastName || "No disponible",
            studentDni: data.dni || "No disponible", // Suponiendo que el DNI del estudiante está aquí
          });
          // Aquí usamos el DNI del estudiante
          fetchEvaluations(data.dni); // Usando el DNI del estudiante
        })
        .catch((err) => {
          console.error("Error al verificar el DNI:", err);
          setError("Error al verificar el DNI.");
          setLoading(false);
        });
    } else {
      setError("DNI no encontrado en sessionStorage.");
      setLoading(false);
    }
  }, []);

  const fetchEvaluations = async (studentDni) => {
    // Cambiado a studentDni
    setLoading(true);
    try {
      const data = await getEvaluationsByDni(studentDni); // Usando studentDni aquí
      console.log("Data received:", data);
      setEvaluations(data);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      setError(error.message || "Error al obtener las evaluaciones");
    } finally {
      setLoading(false);
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
              <strong>DNI:</strong> {studentInfo.studentDni}{" "}
              {/* Usando el nuevo nombre */}
            </Text>
          </Flex>
        </Box>

        {loading && <Text textAlign="center">Cargando evaluaciones...</Text>}
        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        {!loading && !error && evaluations.length > 0 && (
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
                <Th>Año</Th>
                <Th>Trimestre</Th>
                <Th>Materia</Th>
                <Th>Retroalimentación</Th>
              </Tr>
            </Thead>
            <Tbody bg="white">
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
