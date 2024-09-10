import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Text,
  Select,
  Container,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
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
        street: data.addressStreet,
        city: data.addressCity,
        province: data.addressProvince,
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
        phoneNumber: data.phone,
        email: data.email,
        address,
        dateOfBirth: data.dateOfBirth,
        emergencyContact: {
          name: data.emergencyContactName,
          phone: data.emergencyContactPhone,
        },
        medicalInformation,
        session: data.session,
        registrationNumber: data.registrationNumber,
      };

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
    <Container maxW="container.md" py={8}>
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        <Heading as="h2" size="lg" mb={6} textAlign="center" color="orange.500">
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
              <Heading as="h3" size="md" mb={4}>
                Información Personal
              </Heading>
              <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.firstName} isRequired>
                <FormLabel htmlFor="firstName">Nombre/s</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Ingrese el nombre"
                  {...register("firstName", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.firstName && (
                  <Text color="red.500">{errors.firstName.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.lastName} isRequired>
                <FormLabel htmlFor="lastName">Apellido/s</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Ingrese el apellido"
                  {...register("lastName", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.lastName && (
                  <Text color="red.500">{errors.lastName.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.dateOfBirth} isRequired>
                <FormLabel htmlFor="dateOfBirth">Fecha de Nacimiento</FormLabel>
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
                <FormLabel htmlFor="dni">D.N.I.</FormLabel>
                <Input
                  id="dni"
                  type="text"
                  placeholder="Ingrese el DNI"
                  {...register("dni", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.dni && (
                  <Text color="red.500">{errors.dni.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.email} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingrese el email"
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
              <FormControl isInvalid={errors.phone} isRequired>
                <FormLabel htmlFor="phone">Celular</FormLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ingrese el celular"
                  {...register("phone", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.phone && (
                  <Text color="red.500">{errors.phone.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Dirección */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={4}>
                Dirección
              </Heading>
              <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressStreet} isRequired>
                <FormLabel htmlFor="addressStreet">Calle</FormLabel>
                <Input
                  id="addressStreet"
                  type="text"
                  placeholder="Ingrese la calle"
                  {...register("addressStreet", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.addressStreet && (
                  <Text color="red.500">{errors.addressStreet.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressCity} isRequired>
                <FormLabel htmlFor="addressCity">Ciudad</FormLabel>
                <Input
                  id="addressCity"
                  type="text"
                  placeholder="Ingrese la ciudad"
                  {...register("addressCity", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.addressCity && (
                  <Text color="red.500">{errors.addressCity.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressProvince} isRequired>
                <FormLabel htmlFor="addressProvince">Provincia</FormLabel>
                <Input
                  id="addressProvince"
                  type="text"
                  placeholder="Ingrese la provincia"
                  {...register("addressProvince", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.addressProvince && (
                  <Text color="red.500">{errors.addressProvince.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.addressZipcode} isRequired>
                <FormLabel htmlFor="addressZipcode">Código Postal</FormLabel>
                <Input
                  id="addressZipcode"
                  type="text"
                  placeholder="Ingrese el código postal"
                  {...register("addressZipcode", {
                    required: "Este campo es obligatorio",
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
              <Heading as="h3" size="md" mb={4}>
                Datos Académicos
              </Heading>
              <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.registrationNumber} isRequired>
                <FormLabel htmlFor="registrationNumber">
                  Número de Matrícula
                </FormLabel>
                <Input
                  id="registrationNumber"
                  type="text"
                  placeholder="Ingrese el número de matrícula"
                />
                {errors.registrationNumber && (
                  <Text color="red.500">
                    {errors.registrationNumber.message}
                  </Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.session} isRequired>
                <FormLabel htmlFor="session">Turno</FormLabel>
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

            {/* Información de Contacto de Emergencia */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={4}>
                Información de Contacto de Emergencia
              </Heading>
              <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.emergencyContactName} isRequired>
                <FormLabel htmlFor="emergencyContactName">
                  Nombre del Contacto
                </FormLabel>
                <Input
                  id="emergencyContactName"
                  type="text"
                  placeholder="Ingrese el nombre del contacto"
                  {...register("emergencyContactName", {
                    required: "Este campo es obligatorio",
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
                  Teléfono del Contacto
                </FormLabel>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  placeholder="Ingrese el teléfono del contacto"
                  {...register("emergencyContactPhone", {
                    required: "Este campo es obligatorio",
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
              <Heading as="h3" size="md" mb={4}>
                Información Médica
              </Heading>
              <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.bloodType} isRequired>
                <FormLabel htmlFor="bloodType">Grupo Sanguíneo</FormLabel>
                <Input
                  id="bloodType"
                  type="text"
                  placeholder="Ingrese el grupo sanguíneo"
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
                <FormLabel htmlFor="allergies">Alergias</FormLabel>
                <Input
                  id="allergies"
                  type="text"
                  placeholder="Ingrese las alergias (separadas por coma)"
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
                  Otras Afecciones
                </FormLabel>
                <Input
                  id="additionalConditions"
                  type="text"
                  placeholder="Ingrese otras afecciones"
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
            <Text color="green.800">
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
