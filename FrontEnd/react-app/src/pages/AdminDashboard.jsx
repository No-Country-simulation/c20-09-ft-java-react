import React, { useState } from "react";
import {
  Container,
  Heading,
  Button,
  VStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import RegisterTeacher from "./admin/RegisterTeacher";
import RegisterStudent from "./admin/RegisterStudent";
import RegisterParent from "./admin/RegisterParent";

const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState("teacher"); // Estado para controlar el formulario activo

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6} textAlign="center" color="orange.500">
        Panel de Administración
      </Heading>

      <VStack spacing={4} align="stretch" mb={6}>
        <Button
          colorScheme={activeForm === "teacher" ? "orange" : "gray"}
          onClick={() => setActiveForm("teacher")}
        >
          Registrar Profesor
        </Button>
        <Button
          colorScheme={activeForm === "student" ? "orange" : "gray"}
          onClick={() => setActiveForm("student")}
        >
          Registrar Estudiante
        </Button>
        <Button
          colorScheme={activeForm === "parent" ? "orange" : "gray"}
          onClick={() => setActiveForm("parent")}
        >
          Registrar Padre/Tutor
        </Button>
      </VStack>

      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        {activeForm === "teacher" && <RegisterTeacher />}
        {activeForm === "student" && <RegisterStudent />}
        {activeForm === "parent" && <RegisterParent />}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
