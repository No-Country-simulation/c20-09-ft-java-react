import React, { useEffect, useState } from "react";
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
  Grid,
  GridItem,
  Text,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { registerParent, findStudentById } from "../../services/adminService"; // Asegúrate de que la ruta sea correcta

const RegisterParent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "children",
  });
  const toast = useToast();

  // Watch for changes in child IDs
  const children = watch("children");

  useEffect(() => {
    const updateChildNames = async () => {
      for (let index = 0; index < children.length; index++) {
        const childId = watch(`children.${index}.id`); // Observa el ID del niño individualmente
        if (childId) {
          try {
            const data = await findStudentById(childId);
            if (data) {
              setValue(`children.${index}.childName`, data.childName || "");
            }
          } catch (error) {
            console.error("Error fetching child data:", error);
          }
        }
      }
    };

    // Añadimos un debounce para que no se haga la consulta al servidor en cada cambio de tecla
    const timeoutId = setTimeout(() => {
      updateChildNames();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId); // Limpiar el timeout para evitar múltiples llamadas rápidas
  }, [children, setValue, watch]); // Observa cambios en los hijos, el valor del formulario y los cambios individuales en los IDs

  const onSubmit = async (data) => {
    try {
      // Transformar la dirección en un objeto
      const address = {
        state: data.state,
        city: data.city,
        zipCode: data.zipCode,
        streetNameNumberDepartmentFloorAndNumber:
          data.streetNameNumberDepartmentFloorAndNumber,
        country: data.country,
      };

      // Preparar los hijos en un array
      const children = data.children.map((child) => ({
        id: child.id, // Añadido ID del hijo
        childDNI: child.childDNI,
        childName: child.childName,
      }));

      // Preparar el objeto final
      const finalData = {
        name: data.nombres,
        lastName: data.apellidos,
        dni: data.dni,
        phoneNumber: data.telefono,
        email: data.email,
        occupation: data.occupation,
        relationshipToChild: data.relacion,
        emergencyContactName: data.emergencyContactName,
        emergencyPhone: data.emergencyPhone,
        address,
        children,
      };

      await registerParent(finalData);

      toast({
        title: "Éxito",
        description: "Padre/Tutor registrado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar al padre/tutor.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading as="h1" mb={6} textAlign="center" color="orange.500">
        Registro de Padre/Tutor
      </Heading>
      <Box bg="white" p={6} borderRadius="md" boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align="stretch">
            {/* Información Personal */}
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Información Personal
              </Heading>
              <Divider mb={4} />
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.nombres} isRequired>
                    <FormLabel htmlFor="nombres">Nombre/s</FormLabel>
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
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.apellidos} isRequired>
                    <FormLabel htmlFor="apellidos">Apellido/s</FormLabel>
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
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.dni} isRequired>
                    <FormLabel htmlFor="dni">DNI</FormLabel>
                    <Input
                      id="dni"
                      type="text"
                      placeholder="Ingrese su DNI o documento de identidad"
                      {...register("dni", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.dni && (
                      <Text color="red.500">{errors.dni.message}</Text>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
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

                <GridItem colSpan={1}>
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
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.occupation} isRequired>
                    <FormLabel htmlFor="occupation">Ocupación</FormLabel>
                    <Input
                      id="occupation"
                      type="text"
                      placeholder="Ingrese su ocupación"
                      {...register("occupation", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.occupation && (
                      <Text color="red.500">{errors.occupation.message}</Text>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.relacion} isRequired>
                    <FormLabel htmlFor="relacion">
                      Relación con el Niño
                    </FormLabel>
                    <Select
                      id="relacion"
                      placeholder="Seleccione la relación con el estudiante"
                      {...register("relacion", {
                        required: "Este campo es obligatorio",
                      })}
                    >
                      <option value="Padre">Padre</option>
                      <option value="Madre">Madre</option>
                      <option value="Abuelo/a">Abuelo/a</option>
                      <option value="Tutor Legal">Tutor Legal</option>
                    </Select>
                    {errors.relacion && (
                      <Text color="red.500">{errors.relacion.message}</Text>
                    )}
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            {/* Datos de Emergencia */}
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Datos de Emergencia
              </Heading>
              <Divider mb={4} />
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.emergencyContactName}>
                    <FormLabel htmlFor="emergencyContactName">
                      Nombre del Contacto de Emergencia
                    </FormLabel>
                    <Input
                      id="emergencyContactName"
                      type="text"
                      placeholder="Ingrese el nombre del contacto de emergencia"
                      {...register("emergencyContactName")}
                    />
                    {errors.emergencyContactName && (
                      <Text color="red.500">
                        {errors.emergencyContactName.message}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.emergencyPhone} isRequired>
                    <FormLabel htmlFor="emergencyPhone">
                      Teléfono de Emergencia
                    </FormLabel>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="Ingrese el teléfono de emergencia"
                      {...register("emergencyPhone", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.emergencyPhone && (
                      <Text color="red.500">
                        {errors.emergencyPhone.message}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>

            {/* Dirección */}
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Dirección
              </Heading>
              <Divider mb={4} />
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                <GridItem colSpan={1}>
                  <FormControl
                    isInvalid={errors.streetNameNumberDepartmentFloorAndNumber}
                    isRequired
                  >
                    <FormLabel htmlFor="streetNameNumberDepartmentFloorAndNumber">
                      Dirección
                    </FormLabel>
                    <Input
                      id="streetNameNumberDepartmentFloorAndNumber"
                      type="text"
                      placeholder="Ingrese la dirección completa"
                      {...register("streetNameNumberDepartmentFloorAndNumber", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.streetNameNumberDepartmentFloorAndNumber && (
                      <Text color="red.500">
                        {
                          errors.streetNameNumberDepartmentFloorAndNumber
                            .message
                        }
                      </Text>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.state} isRequired>
                    <FormLabel htmlFor="state">Provincia</FormLabel>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Ingrese el estado o provincia"
                      {...register("state", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.state && (
                      <Text color="red.500">{errors.state.message}</Text>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
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

                <GridItem colSpan={1}>
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

                <GridItem colSpan={1}>
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
              </Grid>
            </Box>

            {/* Hijos */}
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Hijos
              </Heading>
              <Divider mb={4} />
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  mb={4}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                    gap={4}
                  >
                    <GridItem colSpan={1}>
                      <FormControl
                        isInvalid={errors.children?.[index]?.id}
                        isRequired
                      >
                        <FormLabel htmlFor={`children[${index}].id`}>
                          ID del Niño
                        </FormLabel>
                        <Input
                          id={`children[${index}].id`}
                          type="text"
                          placeholder="Ingrese el ID del niño"
                          {...register(`children.${index}.id`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.children?.[index]?.id && (
                          <Text color="red.500">
                            {errors.children[index].id.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                      <FormControl
                        isInvalid={errors.children?.[index]?.childName}
                        isRequired
                      >
                        <FormLabel htmlFor={`children[${index}].childName`}>
                          Nombre del Niño
                        </FormLabel>
                        <Input
                          id={`children[${index}].childName`}
                          type="text"
                          placeholder="Ingrese el nombre del niño"
                          {...register(`children.${index}.childName`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.children?.[index]?.childName && (
                          <Text color="red.500">
                            {errors.children[index].childName.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Box>
              ))}
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => append({ id: "", childDNI: "", childName: "" })}
              >
                Añadir Hijo
              </Button>
            </Box>

            {/* Botón de Enviar */}
            <Button
              mt={6}
              colorScheme="teal"
              type="submit"
              size="lg"
              isFullWidth
            >
              Registrar
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterParent;
