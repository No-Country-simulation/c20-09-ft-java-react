import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoDonorinoSchoolBlack.webp";
import btnHistorial from "../assets/tu_historial_academico.webp";
import btnRendimiento from "../assets/tu_rendimiento.webp";
import btnMensajes from "../assets/tus_mensajes.webp";
import "./Dashboard.css";
import RegisterEvaluations from "./teacher/RegisterEvaluations";

const TeacherDashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    isOpen: isHistorialOpen,
    onOpen: onHistorialOpen,
    onClose: onHistorialClose,
  } = useDisclosure();
  const {
    isOpen: isRendimientoOpen,
    onOpen: onRendimientoOpen,
    onClose: onRendimientoClose,
  } = useDisclosure();
  const {
    isOpen: isMensajesOpen,
    onOpen: onMensajesOpen,
    onClose: onMensajesClose,
  } = useDisclosure();

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
          <a href="#" onClick={onHistorialOpen}>
            <Image
              src={btnHistorial}
              alt="Historial Académico"
              className="option-img"
            />
          </a>
          <a href="#" onClick={onRendimientoOpen}>
            <Image
              src={btnRendimiento}
              alt="Informes de Rendimiento"
              className="option-img"
            />
          </a>
          <a href="#" onClick={onMensajesOpen}>
            <Image
              src={btnMensajes}
              alt="Mensajes y Notificaciones"
              className="option-img"
            />
          </a>
        </div>

        {/* Modal de Historial Académico */}
        <Modal isOpen={isHistorialOpen} onClose={onHistorialClose} size="full">
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
            <ModalHeader color="white">Historial Académico</ModalHeader>
            <ModalBody overflowY="auto">
              {/* Contenido del modal de Historial Académico */}
              <Text mb={4}>
                Aquí puedes consultar el historial académico de tus estudiantes.
              </Text>
              {/* Aquí puedes incluir el componente o el contenido específico */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={onHistorialClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Rendimiento */}
        <Modal
          isOpen={isRendimientoOpen}
          onClose={onRendimientoClose}
          size="full"
        >
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
              {/* Contenido del modal de Rendimiento */}
              <RegisterEvaluations/>
              {/* Aquí puedes incluir el componente o el contenido específico */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={onRendimientoClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Mensajes */}
        <Modal isOpen={isMensajesOpen} onClose={onMensajesClose} size="full">
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
            <ModalHeader color="white">Mensajes</ModalHeader>
            <ModalBody overflowY="auto">
              {/* Contenido del modal de Mensajes */}
              <Text mb={4}>
                Aquí puedes revisar y enviar mensajes a estudiantes y otros
                profesores.
              </Text>
              {/* Aquí puedes incluir el componente o el contenido específico */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={onMensajesClose}>
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

export default TeacherDashboard;
