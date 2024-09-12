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
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { registerParent, verifyChildByDni } from "../../services/adminService"; // Asegúrate de que la ruta sea correcta

const RegisterParent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const handleRemoveChild = (index) => {
    remove(index);
  };

  const toast = useToast();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [password, setPassword] = useState("");

  // Watch for changes in child IDs
  const children = watch("children");

  useEffect(() => {
    const fetchStudentData = async () => {
      const childDNIs = children
        .map((child) => child.childDNI)
        .filter((dni) => dni && dni.length === 8);
      for (let index = 0; index < childDNIs.length; index++) {
        const childDNI = childDNIs[index];
        try {
          const data = await verifyChildByDni(childDNI);
          if (data) {
            console.log(`Fetched data for DNI ${childDNI}:`, data);
            setValue(
              `children.${index}.childName`,
              data.firstName + " " + data.lastName || ""
            );
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };

    // Añadimos un debounce para evitar llamadas excesivas
    const timeoutId = setTimeout(() => {
      fetchStudentData();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId); // Limpiar el timeout
  }, [children, watch, setValue]); // Observa cambios en `children`, `watch`, y `setValue`

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
        // Añadido ID del hijo
        childDNI: child.childDNI,
      }));

      // Preparar el objeto final
      const finalData = {
        name: data.nombres,
        lastName: data.apellidos,
        dni: data.dni,
        phoneNumber: data.phoneNumber,
        email: data.email,
        occupation: data.occupation,
        relationshipToChild: data.relacion,
        emergencyContactName: data.emergencyContactName,
        emergencyPhone: data.emergencyPhone,
        address,
        children,
      };

      const response = await registerParent(finalData);
      const generatedPassword = response?.password || "123456"; // Reemplaza con lógica real si es necesario

      setPassword(generatedPassword);
      setRegistrationSuccess(true);

      toast({
        title: "Éxito",
        description: "Padre/Tutor registrado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo registrar al padre/madre.",
        status: "error",
        duration: 55000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Registro de Padre/Madre
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align="stretch">
            {/* Información Personal */}
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Información Personal
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.nombres} isRequired>
                    <FormLabel htmlFor="nombres">Nombre/s:</FormLabel>
                    <Input
                      id="nombres"
                      type="text"
                      placeholder="Ej: Juan Carlos, Alfredo"
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
                    <FormLabel htmlFor="apellidos">Apellido/s:</FormLabel>
                    <Input
                      id="apellidos"
                      type="text"
                      placeholder="Ej: Gil, Benitez, Retamozo"
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
                    <FormLabel htmlFor="dni">D.N.I.:</FormLabel>
                    <Input
                      id="dni"
                      type="text"
                      placeholder="Ej: 35765489, 19432567"
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
                  <FormControl isInvalid={errors.phoneNumber} isRequired>
                    <FormLabel htmlFor="phoneNumber">Celular:</FormLabel>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Ej: 1187693452"
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

                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.email} isRequired>
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ej: padre@hotmail.com"
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
                    <FormLabel htmlFor="occupation">
                      Ocupación laboral:
                    </FormLabel>
                    <Input
                      id="occupation"
                      type="text"
                      placeholder="Ej: Médico, Profesor, Empresario, Enfermero, Abogado, Ingeniero, Farmacéutico, Técnico"
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
                      Vínculo con el estudiante:
                    </FormLabel>
                    <Select
                      id="relacion"
                      placeholder="Seleccione el vínculo con el estudiante"
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
              <Heading as="h3" size="md" mb={2}>
                Datos de Emergencia
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={4}
              >
                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.emergencyContactName}>
                    <FormLabel htmlFor="emergencyContactName">
                      Nombre del Contacto (emergencias):
                    </FormLabel>
                    <Input
                      id="emergencyContactName"
                      type="text"
                      placeholder="Ej: Juan Pérez (tío), María Gómez (vecina), Ana Rodríguez (madre)"
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
                      Celular (emergencias):
                    </FormLabel>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      placeholder="Ej: 1187693452, 113465879234"
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
              <Heading as="h3" size="md" mb={2}>
                Dirección
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
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
                      Calle:
                    </FormLabel>
                    <Input
                      id="streetNameNumberDepartmentFloorAndNumber"
                      type="text"
                      placeholder="Av. Corrientes 1234, Piso 2, Dpto A"
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
                    <FormLabel htmlFor="state">Provincia:</FormLabel>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Buenos Aires"
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
                    <FormLabel htmlFor="city">Ciudad:</FormLabel>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Ciudad Autónoma de Buenos Aires"
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
                    <FormLabel htmlFor="zipCode">Código Postal:</FormLabel>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="C1043AAE"
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
                    <FormLabel htmlFor="country">País:</FormLabel>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Argentina"
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
              <Heading as="h3" size="md" mb={2}>
                Hijos
              </Heading>
              <Divider mb={4} sx={{ borderBottom: "2px solid #E67E22" }} />
              {fields.map((item, index) => (
                <Box key={item.id} mb={4}>
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                    gap={4}
                  >
                    <GridItem colSpan={1}>
                      <FormControl
                        isInvalid={errors.children?.[index]?.childDNI}
                        isRequired
                      >
                        <FormLabel htmlFor={`children.${index}.childDNI`}>
                          D.N.I. del Niño/a:
                        </FormLabel>
                        <Input
                          id={`children.${index}.childDNI`}
                          type="text"
                          placeholder="Ej: 35765489, 19432567"
                          {...register(`children.${index}.childDNI`, {
                            required: "Este campo es obligatorio",
                          })}
                        />
                        {errors.children?.[index]?.childDNI && (
                          <Text color="red.500">
                            {errors.children[index].childDNI.message}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormControl
                        isInvalid={errors.children?.[index]?.childName}
                        isRequired
                      >
                        <FormLabel htmlFor={`children.${index}.childName`}>
                          Nombre del Niño/a:
                        </FormLabel>
                        <Input
                          id={`children.${index}.childName`}
                          type="text"
                          placeholder="Nombre del niño/a"
                          {...register(`children.${index}.childName`, {
                            required: "Este campo es obligatorio",
                          })}
                          readOnly
                          border="none"
                          background="transparent"
                          _focus={{ boxShadow: "none" }}
                          _hover={{ border: "none" }}
                        />
                        {errors.children?.[index]?.childName && (
                          <Text color="red.500">
                            {errors.children[index].childName.message}
                          </Text>
                        )}
                      </FormControl>
                      <Button size="sm" onClick={() => remove(index)}>
                        x
                      </Button>
                    </GridItem>
                  </Grid>
                </Box>
              ))}
              <Button
                colorScheme="orange"
                mt={4}
                onClick={() => append({ childDNI: "", childName: "" })}
              >
                {" "}
                Añadir otro hijo
              </Button>
            </Box>
            {/* Botón de Enviar */}
            <Button type="submit" colorScheme="orange" width="full" mt={4}>
              Registrar
            </Button>
          </VStack>
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

export default RegisterParent;
