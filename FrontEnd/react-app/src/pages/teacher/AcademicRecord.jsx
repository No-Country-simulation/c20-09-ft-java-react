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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Datos simulados de registros académicos
const simulatedRecords = [
  {
    id: 1,
    studentId: "s001",
    studentName: "Juan Pérez",
    teacherName: "Prof. Ana López",
    courseCode: "MAT101",
    courseName: "Matemáticas",
    subject: "Álgebra",
    grade: "A",
    percentage: 92,
    year: 2023,
    evaluationDate: "2023-06-15",
    comments: "Excelente desempeño en el examen final.",
    status: "Finalizado",
  },
  {
    id: 2,
    studentId: "s002",
    studentName: "María García",
    teacherName: "Prof. Juan Martínez",
    courseCode: "CIE102",
    courseName: "Ciencias",
    subject: "Biología",
    grade: "B",
    percentage: 85,
    year: 2023,
    evaluationDate: "2023-05-10",
    comments: "Necesita mejorar en los trabajos prácticos.",
    status: "Finalizado",
  },
  // ... otros registros
];

const AcademicRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Simular la carga de datos
    setTimeout(() => {
      setRecords(simulatedRecords); // Asignar todos los registros simulados
      setLoading(false);
    }, 1000); // Simular un retraso de 1 segundo
  }, []);

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
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
          Registro Académico
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
                onClick={() => handleRecordClick(record)} // Manejar clic en el registro
              >
                <Text fontWeight="bold">{record.courseName}</Text>
                <Text>Asignatura: {record.subject}</Text>
                <Text>Calificación: {record.grade}</Text>
                <Text>Año: {record.year}</Text>
              </ListItem>
            ))}
          </List>
        )}
        <Button
          mt={6}
          colorScheme="orange"
          onClick={() => {
            /* Acción para añadir un nuevo registro */
          }}
        >
          Añadir Registro Académico
        </Button>
      </Box>

      {/* Modal para mostrar los detalles del registro seleccionado */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle del Registro Académico</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedRecord && (
              <Box>
                <Text fontWeight="bold">
                  Nombre del Estudiante: {selectedRecord.studentName}
                </Text>
                <Text>Asignatura: {selectedRecord.subject}</Text>
                <Text>Calificación: {selectedRecord.grade}</Text>
                <Text>Porcentaje: {selectedRecord.percentage}%</Text>
                <Text>Año: {selectedRecord.year}</Text>
                <Text>Código del Curso: {selectedRecord.courseCode}</Text>
                <Text>
                  Fecha de Evaluación: {selectedRecord.evaluationDate}
                </Text>
                <Text>Comentarios: {selectedRecord.comments}</Text>
                <Text>Estado: {selectedRecord.status}</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AcademicRecord;
