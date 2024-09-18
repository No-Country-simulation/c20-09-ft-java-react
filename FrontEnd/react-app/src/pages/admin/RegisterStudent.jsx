import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerStudent } from "../../services/adminService"; // Asegúrate de que la ruta sea correcta

const RegisterStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const onSubmit = async (data) => {
    try {
      // Preparar los datos para el envío
      const address = {
        streetNameNumberDepartmentFloorAndNumber: data.addressStreet,
        city: data.addressCity,
        state: data.addressProvince,
        zipCode: data.addressZipcode,
      };

      const medicalInformation = {
        bloodType: data.bloodType,
        allergies: data.allergies.split(",").map((item) => item.trim()), // Convertir a array
        additionalConditions: data.additionalConditions,
      };

      const finalData = {
        name: data.firstName,
        lastName: data.lastName,
        dni: data.dni,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address,
        dateOfBirth: data.dateOfBirth,
        emergencyContactName: data.emergencyContactName,
        emergencyNumber: data.emergencyContactPhone,
        medicalInformation,
        session: data.session,
        year: data.year,
      };
      // Muestra el Objeto que se envia
      // console.log(data);

      const response = await registerStudent(finalData);
      const generatedPassword = response?.password || "123456"; // Reemplaza con lógica real si es necesario

      setPassword(generatedPassword);
      setRegistrationSuccess(true);

      toast({
        title: "Éxito",
        description: "Estudiante registrado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo registrar al estudiante.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container bg="#34495E" maxW="container.lg" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Registro de Alumno
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
            mb={6}
          >
            {/* Información Personal */}
            <GridItem colSpan={2}>
              <Heading as="h3" size="md" color="#34495e" mb={2}>
                Información Personal
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.firstName} isRequired>
                <FormLabel htmlFor="firstName">Nombre/s:</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder=""
                  {...register("firstName", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres",
                    },
                  })}
                />
                {errors.firstName && (
                  <Text color="red.500">{errors.firstName.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.lastName} isRequired>
                <FormLabel htmlFor="lastName">Apellido/s:</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder=""
                  {...register("lastName", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres",
                    },
                  })}
                />
                {errors.lastName && (
                  <Text color="red.500">{errors.lastName.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.dateOfBirth} isRequired>
                <FormLabel htmlFor="dateOfBirth">
                  Fecha de Nacimiento:
                </FormLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.dateOfBirth && (
                  <Text color="red.500">{errors.dateOfBirth.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.dni} isRequired>
                <FormLabel htmlFor="dni">D.N.I.:</FormLabel>
                <Input
                  id="dni"
                  type="text"
                  placeholder=""
                  {...register("dni", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[0-9]{8}$/,
                      message: "El DNI debe tener exactamente 8 dígitos",
                    },
                  })}
                />
                {errors.dni && (
                  <Text color="red.500">{errors.dni.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email">Email:</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  {...register("email", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.phoneNumber} isRequired>
                <FormLabel htmlFor="phoneNumber">Celular:</FormLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Ejemplo 1154327854"
                  {...register("phoneNumber", {
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 10,
                      message:
                        "El número de teléfono no puede tener más de 10 dígitos",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message:
                        "El número de teléfono debe tener exactamente 10 dígitos",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <Text color="red.500">{errors.phoneNumber.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Dirección */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" color="#34495e" mb={2}>
                Dirección
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressStreet} isRequired>
                <FormLabel htmlFor="addressStreet">Calle:</FormLabel>
                <Input
                  id="addressStreet"
                  type="text"
                  placeholder="Ej: Av. Corrientes 1234, Piso 2, Dpto A"
                  {...register("addressStreet", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 5,
                      message: "La calle debe tener al menos 5 caracteres",
                    },
                  })}
                />
                {errors.addressStreet && (
                  <Text color="red.500">{errors.addressStreet.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressCity} isRequired>
                <FormLabel htmlFor="addressCity">Ciudad:</FormLabel>
                <Input
                  id="addressCity"
                  type="text"
                  placeholder=""
                  {...register("addressCity", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 3,
                      message: "La ciudad debe tener al menos 3 caracteres",
                    },
                  })}
                />
                {errors.addressCity && (
                  <Text color="red.500">{errors.addressCity.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressProvince} isRequired>
                <FormLabel htmlFor="addressProvince">Provincia:</FormLabel>
                <Input
                  id="addressProvince"
                  type="text"
                  placeholder=""
                  {...register("addressProvince", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 3,
                      message: "La provincia debe tener al menos 3 caracteres",
                    },
                  })}
                />
                {errors.addressProvince && (
                  <Text color="red.500">{errors.addressProvince.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressZipcode} isRequired>
                <FormLabel htmlFor="addressZipcode">Código Postal:</FormLabel>
                <Input
                  id="addressZipcode"
                  type="text"
                  placeholder=""
                  {...register("addressZipcode", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9]{4,7}$/,
                      message: "El código postal no es válido",
                    },
                  })}
                />
                {errors.addressZipcode && (
                  <Text color="red.500">{errors.addressZipcode.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Datos Académicos */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" color="#34495e" mb={2}>
                Datos Académicos
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.session} isRequired>
                <FormLabel htmlFor="session">Turno:</FormLabel>
                <Select
                  id="session"
                  placeholder="Elija un turno"
                  {...register("session", {
                    required: "Este campo es obligatorio",
                  })}
                >
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                </Select>
                {errors.session && (
                  <Text color="red.500">{errors.session.message}</Text>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.year} isRequired>
                <FormLabel htmlFor="year">Año:</FormLabel>
                <Select id="year" {...register("year")}>
                  <option value="">Selecciona el año</option>
                  <option value="1">1º</option>
                  <option value="2">2º</option>
                  <option value="3">3º</option>
                  <option value="4">4º</option>
                  <option value="5">5º</option>
                </Select>
              </FormControl>
            </GridItem>

            {/* Información de Contacto de Emergencia */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" color="#34495e" mb={2}>
                Información de Contacto de Emergencia
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.emergencyContactName} isRequired>
                <FormLabel htmlFor="emergencyContactName">
                  Nombre del Contacto:
                </FormLabel>
                <Input
                  id="emergencyContactName"
                  type="text"
                  placeholder=""
                  {...register("emergencyContactName", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 3,
                      message:
                        "El nombre del contacto debe tener al menos 3 caracteres",
                    },
                  })}
                />
                {errors.emergencyContactName && (
                  <Text color="red.500">
                    {errors.emergencyContactName.message}
                  </Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.emergencyContactPhone} isRequired>
                <FormLabel htmlFor="emergencyContactPhone">
                  Celular (emergencias):
                </FormLabel>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  placeholder="Ejemplo 1154327854"
                  {...register("emergencyContactPhone", {
                    required: "Este campo es obligatorio",
                    maxLength: {
                      value: 10,
                      message:
                        "El número de teléfono no puede tener más de 10 dígitos",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message:
                        "El número de teléfono debe tener exactamente 10 dígitos",
                    },
                  })}
                />
                {errors.emergencyContactPhone && (
                  <Text color="red.500">
                    {errors.emergencyContactPhone.message}
                  </Text>
                )}
              </FormControl>
            </GridItem>

            {/* Información Médica */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" color="#34495e" mb={2}>
                Información Médica
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.bloodType} isRequired>
                <FormLabel htmlFor="bloodType">Grupo Sanguíneo:</FormLabel>
                <Input
                  id="bloodType"
                  type="text"
                  placeholder="Ingresa el grupo y factor sanguíneo."
                  {...register("bloodType", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.bloodType && (
                  <Text color="red.500">{errors.bloodType.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.allergies}>
                <FormLabel htmlFor="allergies">Alergias:</FormLabel>
                <Input
                  id="allergies"
                  type="text"
                  placeholder="Ingresa las alergias separadas por comas."
                  {...register("allergies")}
                />
                {errors.allergies && (
                  <Text color="red.500">{errors.allergies.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.additionalConditions}>
                <FormLabel htmlFor="additionalConditions">
                  Otras Afecciones:
                </FormLabel>
                <Input
                  id="additionalConditions"
                  type="text"
                  placeholder="Ingresa todos los datos relevantes."
                  {...register("additionalConditions")}
                />
                {errors.additionalConditions && (
                  <Text color="red.500">
                    {errors.additionalConditions.message}
                  </Text>
                )}
              </FormControl>
            </GridItem>
          </Grid>

          <Button type="submit" colorScheme="orange" width="full" mt={4}>
            Registrar Alumno
          </Button>
        </form>

        {registrationSuccess && password && (
          <Box
            mt={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="green.500"
            bg="green.50"
          >
            <Text color="orange">
              ¡Registro exitoso! La contraseña generada es:{" "}
              <strong>{password}</strong>
            </Text>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RegisterStudent;
