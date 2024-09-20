import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { verifyStudentByParentDni } from "../../services/teacherService"; // Importa el nuevo servicio

const AcademicRecord = () => {
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    dni: "",
  });
  const academicHistory = [
    {
      year: "3º",
      subject: "Matemáticas",
      grade: "8.5",
      status: "APROBADA",
      date: "12/07/2024",
    },
    {
      year: "3º",
      subject: "Lengua y Literatura",
      grade: "9.0",
      status: "APROBADA",
      date: "15/07/2024",
    },
    {
      year: "3º",
      subject: "Historia",
      grade: "6.0",
      status: "PENDIENTE",
      date: "18/07/2024",
    },
    {
      year: "3º",
      subject: "Educación Física",
      grade: "10",
      status: "APROBADA",
      date: "22/07/2024",
    },
  ];

  useEffect(() => {
    const dni = sessionStorage.getItem("dni");
    if (dni) {
      verifyStudentByParentDni(dni) // Usa el nuevo servicio
        .then((data) => {
          // Suponiendo que la respuesta contiene firstName y lastName
          setStudentInfo({
            firstName: data.firstName || "No disponible",
            lastName: data.lastName || "No disponible",
            dniStudent: data.dni,
          });
        })
        .catch((err) => {
          console.error("Error al verificar el estudiante:", err);
        });
    }
  }, []);

  return (
    <Container bg="#34495E" maxW="container.lg" py={6}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Historial Académico
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
              <strong>DNI:</strong> {studentInfo.dniStudent}
            </Text>
          </Flex>
        </Box>

        <Table
          variant="simple"
          size={useBreakpointValue({ base: "sm", md: "lg" })}
          boxShadow="md"
          borderWidth={1}
          borderRadius="md"
          overflow="hidden"
        >
          <Thead bg="orange.400">
            <Tr>
              <Th color="white">Año</Th>
              <Th color="white">Materia</Th>
              <Th color="white">Nota</Th>
              <Th color="white">Estado Materia</Th>
              <Th color="white">Fecha del Acta</Th>
            </Tr>
          </Thead>
          <Tbody bg="white">
            {academicHistory.map((record, index) => (
              <Tr key={index}>
                <Td>{record.year}</Td>
                <Td>{record.subject}</Td>
                <Td>{record.grade}</Td>
                <Td>{record.status}</Td>
                <Td>{record.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default AcademicRecord;
