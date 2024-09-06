import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  useToast,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const RegisterStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      // Aquí se haría la llamada al backend para procesar el registro
      console.log(data);
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
      <Heading as="h1" mb={6} textAlign="center" color="orange.500">
        Registro de Estudiante
      </Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.nombres} isRequired>
              <FormLabel htmlFor="nombres">Nombres</FormLabel>
              <Input
                id="nombres"
                type="text"
                placeholder="Ingrese sus nombres"
                {...register("nombres", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.nombres && (
                <Text color="red.500">{errors.nombres.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.apellidos} isRequired>
              <FormLabel htmlFor="apellidos">Apellidos</FormLabel>
              <Input
                id="apellidos"
                type="text"
                placeholder="Ingrese sus apellidos"
                {...register("apellidos", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.apellidos && (
                <Text color="red.500">{errors.apellidos.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.fechaNacimiento} isRequired>
              <FormLabel htmlFor="fechaNacimiento">
                Fecha de Nacimiento
              </FormLabel>
              <Input
                id="fechaNacimiento"
                type="date"
                {...register("fechaNacimiento", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.fechaNacimiento && (
                <Text color="red.500">{errors.fechaNacimiento.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.dni} isRequired>
              <FormLabel htmlFor="dni">
                DNI
              </FormLabel>
              <Input
                id="dni"
                type="text"
                placeholder="Ingrese el número de identificación"
                {...register("dni", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.dni && (
                <Text color="red.500">
                  {errors.dni.message}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.email} isRequired>
              <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su correo electrónico"
                {...register("email", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.telefono} isRequired>
              <FormLabel htmlFor="telefono">Teléfono</FormLabel>
              <Input
                id="telefono"
                type="tel"
                placeholder="Ingrese su teléfono"
                {...register("telefono", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.telefono && (
                <Text color="red.500">{errors.telefono.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.direccion}>
              <FormLabel htmlFor="direccion">Dirección</FormLabel>
              <Input
                id="direccion"
                type="text"
                placeholder="Ingrese su dirección"
                {...register("direccion")}
              />
              {errors.direccion && (
                <Text color="red.500">{errors.direccion.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.carrera} isRequired>
              <FormLabel htmlFor="carrera">Carrera/Grado</FormLabel>
              <Input
                id="carrera"
                type="text"
                placeholder="Ingrese su carrera o grado"
                {...register("carrera", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.carrera && (
                <Text color="red.500">{errors.carrera.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.matricula} isRequired>
              <FormLabel htmlFor="matricula">Matrícula</FormLabel>
              <Input
                id="matricula"
                type="text"
                placeholder="Ingrese su número de matrícula"
                {...register("matricula", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.matricula && (
                <Text color="red.500">{errors.matricula.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.padreTutor}>
              <FormLabel htmlFor="padreTutor">Nombre del Padre/Tutor</FormLabel>
              <Input
                id="padreTutor"
                type="text"
                placeholder="Ingrese el nombre del padre o tutor"
                {...register("padreTutor")}
              />
              {errors.padreTutor && (
                <Text color="red.500">{errors.padreTutor.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.telefonoTutor}>
              <FormLabel htmlFor="telefonoTutor">
                Teléfono del Padre/Tutor
              </FormLabel>
              <Input
                id="telefonoTutor"
                type="tel"
                placeholder="Ingrese el teléfono del padre o tutor"
                {...register("telefonoTutor")}
              />
              {errors.telefonoTutor && (
                <Text color="red.500">{errors.telefonoTutor.message}</Text>
              )}
            </FormControl>

            <Button type="submit" colorScheme="orange" width="full">
              Registrar
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterStudent;