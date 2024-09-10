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
  Grid,
  GridItem,
  Text,
  Checkbox,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { registerTeacher } from "../../services/adminService";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const RegisterTeacher = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subjects: [{ subjectCode: "", subjectName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      // Preparar la dirección
      const address = {
        state: data.state,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
        streetNameNumberDepartmentFloorAndNumber:
          data.streetNameNumberDepartmentFloorAndNumber,
      };

      // Preparar la información profesional
      const professionalInformation = {
        professorId: data.professorId,
        academicTitles: data.academicTitles,
        subjectCodeNameMap: data.subjects.reduce((acc, subject) => {
          if (subject.subjectCode && subject.subjectName) {
            acc[subject.subjectCode] = subject.subjectName;
          }
          return acc;
        }, {}),
        workingHours: data.workingHours,
        tutorship: data.tutorship === true,
        extracurricularClasses: data.extracurricularClasses === true,
      };

      // Preparar el objeto final
      const finalData = {
        name: data.nombre,
        lastName: data.apellido,
        dni: data.dni,
        phoneNumber: data.telefono,
        email: data.email,
        emergencyContactName: data.emergencyContactName,
        emergencyNumber: data.emergencyNumber,
        address,
        dateOfBirth: data.dateOfBirth,
        professionalInformation,
      };

      // Llamar al servicio de registro y obtener la respuesta
      const response = await registerTeacher(finalData);

      // Asumir que la respuesta contiene la contraseña generada
      setPassword(response.password || data.password); // Ajusta esto si la estructura es diferente
      setRegistrationSuccess(true); // Marca el registro como exitoso

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
      setRegistrationSuccess(false); // Marca el registro como fallido
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6} textAlign="center" color="orange.500">
        Registro de Profesor
      </Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
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
              <FormControl isInvalid={errors.nombre} isRequired>
                <FormLabel htmlFor="nombre">Nombre/s</FormLabel>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese su nombre"
                  {...register("nombre", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.nombre && (
                  <Text color="red.500">{errors.nombre.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.apellido} isRequired>
                <FormLabel htmlFor="apellido">Apellido/s</FormLabel>
                <Input
                  id="apellido"
                  type="text"
                  placeholder="Ingrese su apellido"
                  {...register("apellido", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.apellido && (
                  <Text color="red.500">{errors.apellido.message}</Text>
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
                <FormLabel htmlFor="dni">DNI</FormLabel>
                <Input
                  id="dni"
                  type="text"
                  placeholder="Ingrese el número de identificación"
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
            </GridItem>
            <GridItem>
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
                  <Text color="red.500">{errors.email.message}</Text>
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
              <FormControl
                isInvalid={errors.streetNameNumberDepartmentFloorAndNumber}
                isRequired
              >
                <FormLabel htmlFor="streetNameNumberDepartmentFloorAndNumber">
                  Calle
                </FormLabel>
                <Input
                  id="streetNameNumberDepartmentFloorAndNumber"
                  type="text"
                  placeholder="Ingrese la calle"
                  {...register("streetNameNumberDepartmentFloorAndNumber", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.streetNameNumberDepartmentFloorAndNumber && (
                  <Text color="red.500">
                    {errors.streetNameNumberDepartmentFloorAndNumber.message}
                  </Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.city} isRequired>
                <FormLabel htmlFor="city">Ciudad</FormLabel>
                <Input
                  id="city"
                  type="text"
                  placeholder="Ingrese la ciudad"
                  {...register("city", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.city && (
                  <Text color="red.500">{errors.city.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.state} isRequired>
                <FormLabel htmlFor="state">Provincia</FormLabel>
                <Input
                  id="state"
                  type="text"
                  placeholder="Ingrese la provincia"
                  {...register("state", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.state && (
                  <Text color="red.500">{errors.state.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.zipCode} isRequired>
                <FormLabel htmlFor="zipCode">Código Postal</FormLabel>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="Ingrese el código postal"
                  {...register("zipCode", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.zipCode && (
                  <Text color="red.500">{errors.zipCode.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.country} isRequired>
                <FormLabel htmlFor="country">País</FormLabel>
                <Input
                  id="country"
                  type="text"
                  placeholder="Ingrese el país"
                  {...register("country", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.country && (
                  <Text color="red.500">{errors.country.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Información Profesional */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={4}>
                Información Profesional
              </Heading>
              <hr style={{ border: "1px solid #ccc", margin: "20px 0" }} />
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.professorId} isRequired>
                <FormLabel htmlFor="professorId">ID del Profesor</FormLabel>
                <Input
                  id="professorId"
                  type="text"
                  placeholder="Ingrese el ID del profesor"
                  {...register("professorId", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.professorId && (
                  <Text color="red.500">{errors.professorId.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={errors.academicTitles} isRequired>
                <FormLabel htmlFor="academicTitles">
                  Título/s Académico/s
                </FormLabel>
                <Input
                  id="academicTitles"
                  type="text"
                  placeholder="Ingrese los títulos académicos"
                  {...register("academicTitles", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.academicTitles && (
                  <Text color="red.500">{errors.academicTitles.message}</Text>
                )}
              </FormControl>
            </GridItem>

            {/* Materias */}
            <GridItem colSpan={2}>
              <Divider my={4} />
              <Heading as="h3" size="md" mb={4}>
                Materias
              </Heading>
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  mb={4}
                  borderWidth={1}
                  borderRadius="md"
                  p={4}
                >
                  <Grid templateColumns="1fr auto" gap={4}>
                    <GridItem>
                      <FormControl
                        isInvalid={errors.subjects?.[index]?.subjectCode}
                      >
                        <FormLabel htmlFor={`subjects.${index}.subjectCode`}>
                          Código de Materia
                        </FormLabel>
                        <Input
                          id={`subjects.${index}.subjectCode`}
                          type="text"
                          placeholder="Ingrese el código de materia"
                          {...register(`subjects.${index}.subjectCode`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.subjects?.[index]?.subjectCode && (
                          <Text color="red.500">
                            {errors.subjects[index].subjectCode.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl
                        isInvalid={errors.subjects?.[index]?.subjectName}
                      >
                        <FormLabel htmlFor={`subjects.${index}.subjectName`}>
                          Nombre de la Materia
                        </FormLabel>
                        <Input
                          id={`subjects.${index}.subjectName`}
                          type="text"
                          placeholder="Ingrese el nombre de la materia"
                          {...register(`subjects.${index}.subjectName`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.subjects?.[index]?.subjectName && (
                          <Text color="red.500">
                            {errors.subjects[index].subjectName.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <IconButton
                        aria-label="Eliminar materia"
                        icon={<CloseIcon />}
                        onClick={() => remove(index)}
                        colorScheme="orange"
                      />
                    </GridItem>
                  </Grid>
                </Box>
              ))}
              <Button
                mt={4}
                leftIcon={<AddIcon />}
                colorScheme="orange"
                onClick={() => append({ subjectCode: "", subjectName: "" })}
              >
                Añadir Materia
              </Button>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={errors.workingHours} isRequired>
                <FormLabel htmlFor="workingHours">Horas de Trabajo</FormLabel>
                <Input
                  id="workingHours"
                  type="text"
                  placeholder="Ingrese las horas de trabajo"
                  {...register("workingHours", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.workingHours && (
                  <Text color="red.500">{errors.workingHours.message}</Text>
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox id="tutorship" {...register("tutorship")}>
                Tutoría
              </Checkbox>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox
                id="extracurricularClasses"
                {...register("extracurricularClasses")}
              >
                Clases Extracurriculares
              </Checkbox>
            </GridItem>
          </Grid>
          <Button type="submit" colorScheme="orange" width="full" mt={4}>
            Registrar Profesor
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

export default RegisterTeacher;
