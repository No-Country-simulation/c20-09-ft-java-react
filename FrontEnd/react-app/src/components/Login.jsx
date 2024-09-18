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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoSchoolManager.png";
import { loginUser } from "../services/authService";
import { forgotPassword } from "../services/resetService"; // Asegúrate de que la ruta del import sea correcta

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(loginData);
      console.log(response);

      if (response.status === true) {
        toast({
          title: "Cambio de Contraseña Requerido",
          description:
            "Parece que tu contraseña ha caducado o necesita ser actualizada. Por favor, restablece tu contraseña para continuar.",
          status: "info",
          duration: 6000,
          isClosable: true,
        });
        setIsResetting(true);
      } else if (response.status === false) {
        const { name, dni, token } = response;
        const decodedToken = jwtDecode(token);
        const authorities = decodedToken.authorities || "";

        sessionStorage.setItem("name", name);
        sessionStorage.setItem("dni", dni);
        sessionStorage.setItem("token", token);

        // Redirige a la ruta basada en el rol del usuario
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
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Error al iniciar sesión",
        description:
          "Las credenciales son incorrectas o hubo un problema con el servidor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
      console.error("Error sending reset email:", error);
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
                autoComplete="email"
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
                    autoComplete="email"
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
