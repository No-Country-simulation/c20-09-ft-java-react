import { AddIcon, CloseIcon } from "@chakra-ui/icons";
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
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { loadEvaluation } from "../../services/teacherService";
import { verifyChildByDni } from "../../services/adminService"; // Asegúrate de que la ruta sea correcta

const RegisterEvaluations = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dniStudent: "",
      studentName: "",
      studentLastName: "",
      year: "",
      trimester: "",
      subject: "",
      feedback: "",
      evaluations: [{ subjectCode: "", score: "", evaluationDate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "evaluations",
  });

  const handleDniChange = async (event) => {
    const dni = event.target.value;
    if (dni.length === 8) {
      try {
        const studentData = await verifyChildByDni(dni);
        if (studentData) {
          setValue("studentName", studentData.firstName || "");
          setValue("studentLastName", studentData.lastName || "");
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "No se pudo obtener la información del estudiante.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      setValue("studentName", "");
      setValue("studentLastName", "");
    }
  };

  const onSubmit = async (data) => {
    try {
      const evaluations = data.evaluations.map((evaluation) => ({
        subjectCode: evaluation.subjectCode,
        score: evaluation.score,
        evaluationDate: evaluation.evaluationDate,
      }));

      const finalData = {
        dniStudent: data.dniStudent,
        studentName: data.studentName,
        studentLastName: data.studentLastName,
        year: data.year,
        trimester: data.trimester,
        subject: data.subject,
        feedback: data.feedback,
        evaluations,
      };

      const response = await loadEvaluation(finalData);

      setConfirmationMessage(
        `Evaluaciones registradas con éxito. ${response.message || ""}`
      );
      setRegistrationSuccess(true);

      toast({
        title: "Éxito",
        description: "Evaluaciones registradas con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudieron registrar las evaluaciones.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRegistrationSuccess(false);
    }
  };

  return (
    <Container bg="#34495E" maxW="container.lg" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Cargar Evaluaciones
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            {/* Información del Estudiante */}
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="dniStudent">DNI del alumno:</FormLabel>
                <Input
                  id="dniStudent"
                  {...register("dniStudent")}
                  placeholder="Ingresa el DNI del alumno"
                  onChange={handleDniChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="studentName">Nombre del alumno:</FormLabel>
                <Input
                  id="studentName"
                  {...register("studentName")}
                  placeholder="Ingresa el nombre del alumno"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="studentLastName">
                  Apellido del alumno:
                </FormLabel>
                <Input
                  id="studentLastName"
                  {...register("studentLastName")}
                  placeholder="Ingresa el apellido del alumno"
                />
              </FormControl>

              <FormControl isRequired>
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

              <FormControl isRequired>
                <FormLabel htmlFor="trimester">Trimestre:</FormLabel>
                <Select id="trimester" {...register("trimester")}>
                  <option value="">Selecciona el trimestre</option>
                  <option value="primero">Primero</option>
                  <option value="segundo">Segundo</option>
                  <option value="tercero">Tercero</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="subject">Materia:</FormLabel>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Ingresa la materia"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="feedback">Retroalimentación:</FormLabel>
                <Textarea
                  id="feedback"
                  {...register("feedback")}
                  rows={4}
                  placeholder="Escribe la retroalimentación"
                />
              </FormControl>

              <Button type="submit" colorScheme="orange" width="full" mt={4}>
                Registrar Evaluaciones
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterEvaluations;
