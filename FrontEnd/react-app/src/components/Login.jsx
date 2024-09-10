import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/authService";
import { forgotPassword } from "../services/resetService"; // Cambia de resetService a authService
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Link,
} from "@chakra-ui/react";
import logo from "../assets/logoSchoolManager.png";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const authorities = decodedToken.authorities || "";

        if (authorities.includes("ROLE_TEACHER")) {
          navigate("/teacher-dashboard");
        } else if (authorities.includes("ROLE_STUDENT")) {
          navigate("/student-dashboard");
        } else if (authorities.includes("ROLE_PARENT")) {
          navigate("/parent-dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
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
      const token = response.token;
      const decodedToken = jwtDecode(token);
      const authorities = decodedToken.authorities || "";
      let redirectPath = "/";

      if (authorities.includes("ROLE_TEACHER")) {
        redirectPath = "/teacher-dashboard";
      } else if (authorities.includes("ROLE_STUDENT")) {
        redirectPath = "/student-dashboard";
      } else if (authorities.includes("ROLE_PARENT")) {
        redirectPath = "/parent-dashboard";
      }

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

  const handleResetPassword = async () => {
    try {
      await forgotPassword(resetEmail);
      toast({
        title: "Correo Enviado",
        description: "Revisa tu correo para el enlace de restablecimiento.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsResetting(false);
      setResetEmail(""); // Limpiar campo de email
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el correo de restablecimiento.",
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
      >
        <Box textAlign="center" mb={6}>
          <img
            src={logo}
            alt="Logo"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "90%",
            }}
          />
        </Box>

        {isResetting ? (
          <Box>
            <Heading as="h1" size="lg" mb={6} color="orange.500">
              Restablecer Contraseña
            </Heading>
            <FormControl id="reset-email" isRequired>
              <FormLabel color="gray.700">Email</FormLabel>
              <Input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleResetPassword}>
              Enviar Enlace de Restablecimiento
            </Button>
            <Button mt={4} variant="link" onClick={() => setIsResetting(false)}>
              Volver al Inicio de Sesión
            </Button>
          </Box>
        ) : (
          <Box>
            <Heading as="h1" size="lg" mb={6} color="orange.500">
              Iniciar Sesión
            </Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel color="gray.700">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
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
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                    autoComplete="current-password"
                  />
                </FormControl>
                <Button type="submit" colorScheme="orange" width="100%">
                  Iniciar Sesión
                </Button>
              </Stack>
            </form>
            <Link color="blue.500" mt={4} onClick={() => setIsResetting(true)}>
              Olvidé mi contraseña
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
