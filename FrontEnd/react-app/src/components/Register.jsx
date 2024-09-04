// src/components/Register.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    dni: "",
    profileType: "PARENT", // o STUDENT, TEACHER
  });
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Estado para mostrar el éxito del registro

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: formData.email,
      dni: formData.dni,
      roleRequest: {
        roleListName: [formData.profileType],
      },
      profileType: formData.profileType,
    };

    try {
      const response = await registerUser(requestBody);
      setPassword(response.password); // Guardamos la contraseña del response en el estado
      setRegistrationSuccess(true); // Indicamos que el registro fue exitoso
      toast({
        title: "Registro exitoso",
        description: "El usuario se ha registrado exitosamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al registrar al usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error registering user:", error);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6} borderRadius="md" bg="white" boxShadow="md">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Registro de Usuario
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Ingrese su email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="dni">DNI</FormLabel>
            <Input
              id="dni"
              name="dni"
              type="text"
              placeholder="Ingrese su DNI"
              value={formData.dni}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="profileType">Tipo de Perfil</FormLabel>
            <Select
              id="profileType"
              name="profileType"
              value={formData.profileType}
              onChange={handleChange}
            >
              <option value="STUDENT">Estudiante</option>
              <option value="PARENT">Padre/Madre</option>
              <option value="TEACHER">Profesor</option>
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="orange" type="submit">
            Registrarse
          </Button>
        </Stack>
      </form>
      {registrationSuccess && (
        <Box
          mt={6}
          p={4}
          borderRadius="md"
          bg="green.50"
          border="1px"
          borderColor="green.200"
        >
          <Text fontWeight="bold" color="green.700">
            ¡Registro Exitoso!
          </Text>
          <Text mt={2}>
            Esta es tu contraseña: <strong>{password}</strong>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Register;
