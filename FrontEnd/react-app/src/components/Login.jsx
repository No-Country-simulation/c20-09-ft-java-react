import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoSchoolManager.png";
import { loginUser } from "../services/authService";
import { forgotPassword } from "../services/resetService"; // Cambia de resetService a authService

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [name, setName] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
        } else if (authorities.includes("ROLE_ADMIN")) {
          navigate("/admin");
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
      console.log(response); 
      const name = response.name;
      const token = response.token;
      const decodedToken = jwtDecode(token);
      const authorities = decodedToken.authorities || "";
      sessionStorage.setItem("name", name);

      let redirectPath = "/";

      if (authorities.includes("ROLE_TEACHER")) {
        redirectPath = "/teacher-dashboard";
      } else if (authorities.includes("ROLE_STUDENT")) {
        redirectPath = "/student-dashboard";
      } else if (authorities.includes("ROLE_PARENT")) {
        redirectPath = "/parent-dashboard";
      } else if (authorities.includes("ROLE_ADMIN")) {
        redirectPath = "/admin";
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
    setIsLoading(true);
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
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo enviar el correo de restablecimiento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="#34495e"
    >
      <Box
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
        maxW="md"
        bg="#f4f4f4"
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
              <FormLabel color="#34495E">Email</FormLabel>
              <Input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                _focus={{
                  borderColor: "#34495E",
                  boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                }}
              />
            </FormControl>
            <Button
              mt={4}
              color="white"
              isLoading={isLoading}
              colorScheme="orange"
              width="full"
              onClick={handleResetPassword}
            >
              Enviar Enlace de Restablecimiento
            </Button>
            <Button
              mt={8}
              color="#34495E"
              variant="link"
              onClick={() => setIsResetting(false)}
            >
              Iniciar de Sesión
            </Button>
          </Box>
        ) : (
          <Box mt={8}>
            <Heading as="h1" size="lg" mb={6} color="orange.500">
              Iniciar Sesión
            </Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel color="#34495E">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    _focus={{
                      borderColor: "#34495E",
                      boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color="#34495E">Contraseña</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    _focus={{
                      borderColor: "#34495E",
                      outline: "none",
                      boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                    }}
                    autoComplete="current-password"
                  />
                </FormControl>
                <Box mt={8}>
                  <Button type="submit" colorScheme="orange" width="100%">
                    Iniciar Sesión
                  </Button>
                </Box>
              </Stack>
            </form>
            <Box mt={8}>
              <Link color="#34495E" onClick={() => setIsResetting(true)}>
                Olvidé mi contraseña
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
