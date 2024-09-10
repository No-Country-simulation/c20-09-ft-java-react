import React, { useState } from "react";
import {
  Container,
  Heading,
  Button,
  VStack,
  useDisclosure,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import RegisterTeacher from "./admin/RegisterTeacher";
import RegisterStudent from "./admin/RegisterStudent";
import RegisterParent from "./admin/RegisterParent";
import ConfirmModal from "../components/ConfirmModal";
import Statistics from "../components/Statistics";
import ExportData from "../components/ExportData";
import UserManagement from "./admin/UserManagement";

const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [showStats, setShowStats] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);

  const {
    isOpen: isTeacherOpen,
    onOpen: onTeacherOpen,
    onClose: onTeacherClose,
  } = useDisclosure();
  const {
    isOpen: isStudentOpen,
    onOpen: onStudentOpen,
    onClose: onStudentClose,
  } = useDisclosure();
  const {
    isOpen: isParentOpen,
    onOpen: onParentOpen,
    onClose: onParentClose,
  } = useDisclosure();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleConfirm = () => {
    confirmAction();
    setShowConfirmModal(false);
  };

  const userData = [];
  const dataToExport = [];

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6} textAlign="center" color="orange.500">
        Panel de Administración
      </Heading>

      <VStack spacing={4} align="stretch" mb={6}>
        <Button colorScheme="orange" onClick={onTeacherOpen}>
          Registrar Profesor
        </Button>
        <Button colorScheme="orange" onClick={onStudentOpen}>
          Registrar Estudiante
        </Button>
        <Button colorScheme="orange" onClick={onParentOpen}>
          Registrar Padre/Tutor
        </Button>
        {/* <Button colorScheme="blue" onClick={() => setShowStats(true)}>
          Ver Estadísticas
        </Button> */}
        {/* <Button colorScheme="green" onClick={() => setShowExport(true)}>
          Exportar Datos
        </Button> */}
        {/* <Button
          colorScheme="purple"
          onClick={() => setShowUserManagement(true)}
        >
          Administración de Usuarios
        </Button> */}
        {/* <Input
          placeholder="Buscar registros..."
          value={searchTerm}
          onChange={handleSearch}
        /> */}
      </VStack>

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
      />

      {/* Modal de Registro de Profesor */}
      <Modal isOpen={isTeacherOpen} onClose={onTeacherClose} size="full">
        <ModalOverlay />
        <ModalContent
          w="full"
          h="full"
          maxW="none"
          maxH="none"
          borderRadius="md"
          display="flex"
          flexDirection="column"
        >
          <ModalHeader>Registrar Profesor</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            <RegisterTeacher />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onTeacherClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Registro de Estudiante */}
      <Modal isOpen={isStudentOpen} onClose={onStudentClose} size="full">
        <ModalOverlay />
        <ModalContent
          w="full"
          h="full"
          maxW="none"
          maxH="none"
          borderRadius="md"
          display="flex"
          flexDirection="column"
        >
        {/* Modal Registrar Estudiante */}
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            <RegisterStudent />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onStudentClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Registro de Padre/Tutor */}
      <Modal isOpen={isParentOpen} onClose={onParentClose} size="full">
        <ModalOverlay />
        <ModalContent
          w="full"
          h="full"
          maxW="none"
          maxH="none"
          borderRadius="md"
          display="flex"
          flexDirection="column"
        >
          <ModalHeader>Registrar Padre/Tutor</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            <RegisterParent />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onParentClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Estadísticas */}
      <Modal isOpen={showStats} onClose={() => setShowStats(false)} size="full">
        <ModalOverlay />
        <ModalContent
          w="full"
          h="full"
          maxW="none"
          maxH="none"
          borderRadius="md"
          display="flex"
          flexDirection="column"
        >
          <ModalHeader>Estadísticas</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            <Statistics />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setShowStats(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Exportación de Datos */}
      <Modal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        size="full"
      >
        <ModalOverlay />
        <ModalContent
          w="full"
          h="full"
          maxW="none"
          maxH="none"
          borderRadius="md"
          display="flex"
          flexDirection="column"
        >
          <ModalHeader>Exportar Datos</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            <ExportData data={dataToExport} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setShowExport(false)}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Administración de Usuarios */}
      <Modal
        isOpen={showUserManagement}
        onClose={() => setShowUserManagement(false)}
        size="full"
      >
        <ModalOverlay />
        <ModalContent
          w="full"
          h="full"
          maxW="none"
          maxH="none"
          borderRadius="md"
          display="flex"
          flexDirection="column"
        >
          <ModalHeader>Administración de Usuarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            <UserManagement users={userData} />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => setShowUserManagement(false)}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
