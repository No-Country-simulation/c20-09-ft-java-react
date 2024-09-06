import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Container,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const RegisterTeacher = () => {
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
        description: "Profesor registrado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar al profesor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6} textAlign="center" color="orange.500">
        Registro de Profesor
      </Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.nombre} isRequired>
              <FormLabel htmlFor="nombre">Nombres</FormLabel>
              <Input
                id="nombre"
                type="text"
                placeholder="Ingrese su nombre"
                {...register("nombre", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.nombre && (
                <Box color="red.500">{errors.nombre.message}</Box>
              )}
            </FormControl>

            <FormControl isInvalid={errors.apellido} isRequired>
              <FormLabel htmlFor="apellido">Apellidos</FormLabel>
              <Input
                id="apellido"
                type="text"
                placeholder="Ingrese su apellido"
                {...register("apellido", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.apellido && (
                <Box color="red.500">{errors.apellido.message}</Box>
              )}
            </FormControl>

            <FormControl isInvalid={errors.dni} isRequired>
              <FormLabel htmlFor="dni">DNI</FormLabel>
              <Input
                id="dni"
                type="text"
                placeholder="Ingrese el número de identificación"
                {...register("dni", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.dni && <Text color="red.500">{errors.dni.message}</Text>}
            </FormControl>

            <FormControl isInvalid={errors.email} isRequired>
              <FormLabel htmlFor="email">Correo electrónico</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Ingrese su correo electrónico"
                {...register("email", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.email && (
                <Box color="red.500">{errors.email.message}</Box>
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
                <Box color="red.500">{errors.telefono.message}</Box>
              )}
            </FormControl>

            <FormControl isInvalid={errors.titulo} isRequired>
              <FormLabel htmlFor="titulo">Título universitario</FormLabel>
              <Input
                id="titulo"
                type="text"
                placeholder="Ingrese su título universitario"
                {...register("titulo", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.titulo && (
                <Box color="red.500">{errors.titulo.message}</Box>
              )}
            </FormControl>

            <FormControl isInvalid={errors.asignatura} isRequired>
              <FormLabel htmlFor="asignatura">Asignatura que imparte</FormLabel>
              <Input
                id="asignatura"
                type="text"
                placeholder="Ingrese la asignatura que imparte"
                {...register("asignatura", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.asignatura && (
                <Box color="red.500">{errors.asignatura.message}</Box>
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

export default RegisterTeacher;
