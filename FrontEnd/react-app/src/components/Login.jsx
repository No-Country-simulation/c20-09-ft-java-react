import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/authService";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/logoSchoolManager.png";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Redirige si el token ya existe
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const authorities = decodedToken.authorities || "";

        // Redirige al dashboard adecuado basado en el rol
        if (authorities.includes("ROLE_TEACHER")) {
          navigate("/teacher-dashboard");
        } else if (authorities.includes("ROLE_STUDENT")) {
          navigate("/student-dashboard");
        } else if (authorities.includes("ROLE_PARENT")) {
          navigate("/parent-dashboard");
        } else {
          navigate("/"); // Redirige a la página principal si el rol no se reconoce
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Manejo de error opcional
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      console.log("User logged in successfully:", response);

      // Extrae el token de la respuesta
      const token = response.token;
      const decodedToken = jwtDecode(token);

      // Obtén el rol del token decodificado
      const authorities = decodedToken.authorities || "";
      let redirectPath = "/";

      if (authorities.includes("ROLE_TEACHER")) {
        redirectPath = "/teacher-dashboard";
      } else if (authorities.includes("ROLE_STUDENT")) {
        redirectPath = "/student-dashboard";
      } else if (authorities.includes("ROLE_PARENT")) {
        redirectPath = "/parent-dashboard";
      }

      // Redirige al usuario según su rol
      navigate(redirectPath);
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Error al iniciar sesión",
        description: "Las credenciales son incorrectas.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        p={6}
        borderRadius="md"
        boxShadow="lg"
        maxW="md"
        bg="white"
        textAlign="center"
        className="login-container"
      >
        <Box textAlign="center" mb={6}>
          <img
            src={logo}
            alt="Logo"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "90%", // Ajusta el tamaño según sea necesario
            }}
          />
        </Box>
        <Heading as="h1" size="lg" mb={6} color="orange.500">
          Iniciar Sesión
        </Heading>
        <form onSubmit={handleSubmit} className="login-form">
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel color="gray.700">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="input-field"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color="gray.700">Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="input-field"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
            </FormControl>
            <Button type="submit" colorScheme="orange" width="100%">
              Iniciar Sesión
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
