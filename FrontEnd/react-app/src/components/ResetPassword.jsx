import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/resetService";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast({
        title: "Error",
        description: "Token no proporcionado.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, [searchParams, navigate, toast]);

  const validatePassword = (password) => {
    // Ejemplo de expresión regular que asegura al menos 12 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "La contraseña debe tener al menos 12 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
      );
      return;
    } else {
      setPasswordError(""); // Clear error if password is valid
    }

    setLoading(true);

    try {
      await resetPassword(token, newPassword);
      toast({
        title: "Éxito",
        description:
          "La contraseña se ha restablecido con éxito. Puedes iniciar sesión con tu nueva contraseña.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description:
          "No se pudo restablecer la contraseña. Por favor, verifica el token o intenta nuevamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
        <Heading as="h1" size="lg" mb={6} color="orange.500">
          Restablecer Contraseña
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="new-password" isRequired mb={4}>
            <FormLabel color="gray.700">Nueva Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="confirm-password" isRequired mb={4}>
            <FormLabel color="gray.700">Confirmar Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Button
                  variant="link"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputLeftElement>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px blue.500",
                }}
              />
            </InputGroup>
          </FormControl>
          {passwordError && (
            <Text color="red.500" mb={4}>
              {passwordError}
            </Text>
          )}
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={loading}
          >
            Restablecer Contraseña
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
