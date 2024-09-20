import { CheckIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/resetService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    lengthValid: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false); // New state for checking password match
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
      navigate("/");
    }
  }, [searchParams, navigate, toast]);

  const validatePassword = (password) => {
    return {
      lengthValid: password.length >= 11 && password.length <= 12,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%&*_]/.test(password),
    };
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordErrors(validatePassword(value));
    // Check if passwords match
    setPasswordsMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    // Check if passwords match
    setPasswordsMatch(newPassword === value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
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

    // Si no se cumplen los requisitos, evitar el envío
    if (
      !passwordErrors.lengthValid ||
      !passwordErrors.hasUppercase ||
      !passwordErrors.hasLowercase ||
      !passwordErrors.hasSpecialChar
    ) {
      toast({
        title: "Error en la contraseña",
        description:
          "Asegúrate de cumplir todos los requisitos de la contraseña.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
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
      console.error("Error al restablecer la contraseña:", error);
      toast({
        title: "Error",
        description:
          "El token de restablecimiento de contraseña no es válido. Por favor, solicita un nuevo para intentar nuevamente.",
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
        <Heading as="h1" size="lg" mb={6} color="orange.500">
          Restablecer Contraseña
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="new-password" isRequired mb={4}>
            <FormLabel color="#34495E">Nueva Contraseña</FormLabel>
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
                onChange={handlePasswordChange}
                _focus={{
                  borderColor: "#34495E",
                  boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                }}
              />
            </InputGroup>

            {/* Mostrar la validación en tiempo real */}
            <Box mt={2} color="gray.500" textAlign="left">
              {newPassword.length > 0 && (
                <>
                  <Text
                    color={
                      passwordErrors.hasSpecialChar ? "green.500" : "red.500"
                    }
                  >
                    {passwordErrors.hasSpecialChar ? (
                      <IconButton
                        isRound={true}
                        variant="unstyled"
                        aria-label="x"
                        fontSize="20px"
                        icon={<CheckIcon />}
                        size="sm"
                        color="green.500"
                        mr={2}
                        pointerEvents="none"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "20px",
                          color: "red",
                          marginRight: "8px",
                          marginLeft: "8px",
                        }}
                      >
                        ✘
                      </span>
                    )}
                    Un carácter especial (!@#$%&*_)
                  </Text>
                  <Text
                    color={passwordErrors.lengthValid ? "green.500" : "red.500"}
                  >
                    {passwordErrors.lengthValid ? (
                      <IconButton
                        isRound={true}
                        variant="unstyled"
                        aria-label="x"
                        fontSize="20px"
                        icon={<CheckIcon />}
                        size="sm"
                        color="green.500"
                        mr={2}
                        pointerEvents="none"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "20px",
                          color: "red",
                          marginRight: "8px",
                          marginLeft: "8px",
                        }}
                      >
                        ✘
                      </span>
                    )}
                    Entre 11 y 12 caracteres
                  </Text>
                  <Text
                    color={
                      passwordErrors.hasUppercase ? "green.500" : "red.500"
                    }
                  >
                    {passwordErrors.hasUppercase ? (
                      <IconButton
                        isRound={true}
                        variant="unstyled"
                        aria-label="x"
                        fontSize="20px"
                        icon={<CheckIcon />}
                        size="sm"
                        color="green.500"
                        mr={2}
                        pointerEvents="none"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "20px",
                          color: "red",
                          marginRight: "8px",
                          marginLeft: "8px",
                        }}
                      >
                        ✘
                      </span>
                    )}
                    Una letra mayúscula
                  </Text>
                  <Text
                    color={
                      passwordErrors.hasLowercase ? "green.500" : "red.500"
                    }
                  >
                    {passwordErrors.hasLowercase ? (
                      <IconButton
                        isRound={true}
                        variant="unstyled"
                        aria-label="x"
                        fontSize="20px"
                        icon={<CheckIcon />}
                        size="sm"
                        color="green.500"
                        mr={2}
                        pointerEvents="none"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "20px",
                          color: "red",
                          marginRight: "8px",
                          marginLeft: "8px",
                        }}
                      >
                        ✘
                      </span>
                    )}
                    Una letra minúscula
                  </Text>
                </>
              )}
            </Box>
          </FormControl>

          <FormControl id="confirm-password" isRequired mb={4}>
            <FormLabel color="#34495E">Confirmar Contraseña</FormLabel>
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
                onChange={handleConfirmPasswordChange}
                _focus={{
                  borderColor: passwordsMatch ? "green.500" : "#34495E",
                  boxShadow: passwordsMatch
                    ? "0 0 0 3px green.500"
                    : "0 0 15px rgba(52, 73, 94, 0.5)",
                }}
                borderColor={passwordsMatch ? "green.500" : "red.500"}
                borderWidth="1px"
              />
            </InputGroup>
            {!passwordsMatch && confirmPassword.length > 0 && (
              <Text color="red.500" textAlign="left" marginLeft="8px" mt={1}>
                Las contraseñas no coinciden.
              </Text>
            )}
          </FormControl>

          <Button
            width="full"
            mt="4"
            type="submit"
            colorScheme="orange"
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
