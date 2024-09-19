import {
  Box,
  Container,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  useToast,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Datos simulados de registros académicos
const simulatedRecords = [
  {
    id: 1,
    year: "3°",
    subject: "Matemáticas",
    grade: "8.5",
    status: "PENDIENTE",
    date: "12/09/2024",
  },
  {
    id: 2,
    year: "3°",
    subject: "Lengua y Literatura",
    grade: "9.0",
    status: "APROBADA",
    date: "12/07/2024",
  },
  {
    id: 3,
    year: "3°",
    subject: "Historia",
    grade: "6.0",
    status: "PENDIENTE",
    date: "19/09/2024",
  },
  {
    id: 4,
    year: "3°",
    subject: "Educación Física",
    grade: "6.0",
    status: "APROBADA",
    date: "22/07/2024",
  },

  // ... otros registros
];

const AcademicRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Simular la carga de datos
    setTimeout(() => {
      setRecords(simulatedRecords); // Asignar todos los registros simulados
      setLoading(false);
    }, 1000); // Simular un retraso de 1 segundo
  }, []);

  const handleRecordClick = () => {
    // Aquí puedes definir cómo manejar el clic en un registro
    // Para este ejemplo, simplemente setearé los detalles manualmente
    setSelectedDetails();
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h2" mb={4} textAlign="center" color="orange.500">
          Historial Académico
        </Heading>
        {records.length === 0 ? (
          <Text>No hay registros académicos disponibles.</Text>
        ) : (
          <List spacing={3}>
            {records.map((record) => (
              <ListItem
                key={record.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg="white"
                boxShadow="md"
                cursor="pointer"
                onClick={handleRecordClick} // Manejar clic en el registro
              >
                <Text fontWeight="bold">Año: {record.year}</Text>
                <Text fontWeight="bold">Asignatura: {record.subject}</Text>
                <Text>Calificación: {record.grade}</Text>
                <Text>Año: {record.date}</Text>
              </ListItem>
            ))}
          </List>
        )}

        {/* <Button mt={6} colorScheme="orange"  onClick={() => {}}>
          Añadir Registro Académico
        </Button> */}
      </Box>
    </Container>
  );
};

export default AcademicRecord;
