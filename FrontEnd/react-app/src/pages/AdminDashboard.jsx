import {
  Button,
  Container,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import ExportData from "../components/ExportData";
import Statistics from "../components/Statistics";
import RegisterParent from "./admin/RegisterParent";
import RegisterStudent from "./admin/RegisterStudent";
import RegisterTeacher from "./admin/RegisterTeacher";
import UserManagement from "./admin/UserManagement";
import logo from "../assets/logoDonorinoSchoolBlack.webp";
import btnTeacher from "../assets/registrar_profesores.webp";
import btnStudent from "../assets/registrar_alumnos.webp";
import btnParent from "../assets/registrar_padres.webp";

import "./Dashboard.css";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
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

  const handleConfirm = () => {
    confirmAction();
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    // Elimina el token del almacenamiento local y redirige al usuario al inicio de sesión
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const userData = [];
  const dataToExport = [];

  return (
    <div
      style={{
        backgroundColor: "#34495E", // Fondo de la página
        minHeight: "100vh", // Asegura que el fondo cubra toda la altura de la vista
        padding: "20px",
      }}
    >
      <Container
        bg="#f4f4f4"
        maxW="container.lg"
        className="dashboard-container"
        centerContent
      >
        <header className="header-container">
          <div className="logo-container">
            <Image
              src={logo}
              alt="Logo del Colegio"
              boxSize="100px"
              objectFit="cover"
            />
          </div>
          <div className="welcome-message">
            <h1>Bienvenido, {name}</h1>
            <p>Selecciona una opción para continuar:</p>
          </div>
        </header>

        <div className="options-container">
          <a href="#" onClick={onStudentOpen}>
            <Image
              src={btnStudent}
              alt="Registrar Alumnos"
              className="option-img"
            />
            <span>Registrar Alumnos</span>
          </a>
          <a href="#" onClick={onParentOpen}>
            <Image
              src={btnParent}
              alt="Registrar Padres"
              className="option-img"
            />
            <span>Registrar Padres</span>
          </a>
          <a href="#" onClick={onTeacherOpen}>
            <Image
              src={btnTeacher}
              alt="Registrar Profesores"
              className="option-img"
            />
            <span>Registrar Profesores</span>
          </a>
        </div>

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
            bg="#34495e"
            w="full"
            h="full"
            maxW="none"
            maxH="none"
            borderRadius="md"
            display="flex"
            flexDirection="column"
          >
            <ModalCloseButton />
            <ModalBody overflowY="auto">
              <RegisterTeacher />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={onTeacherClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Registro de Estudiante */}
        <Modal isOpen={isStudentOpen} onClose={onStudentClose} size="full">
          <ModalOverlay />
          <ModalContent
            bg="#34495e"
            w="full"
            h="full"
            maxW="none"
            maxH="none"
            borderRadius="md"
            display="flex"
            flexDirection="column"
          >
            <ModalCloseButton />
            <ModalBody overflowY="auto">
              <RegisterStudent />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={onStudentClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Registro de Padre/Tutor */}
        <Modal isOpen={isParentOpen} onClose={onParentClose} size="full">
          <ModalOverlay />
          <ModalContent
            bg="#34495e"
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
              <Button colorScheme="orange" onClick={onParentClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button mt={8} colorScheme="orange" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Container>
    </div>
  );
};

export default AdminDashboard;
