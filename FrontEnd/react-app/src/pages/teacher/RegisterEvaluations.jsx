import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { verifyChildByDni } from "../../services/adminService";
import { loadEvaluation } from "../../services/teacherService";

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

      const response = await loadEvaluation(finalData); // Utiliza el endpoint adecuado

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
    <Container bg="#34495E" maxW="container.md" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Cargar Evaluaciones
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(auto-fill, minmax(1, 1fr))" gap={6}>
            {/* Información del Estudiante */}
            <Box>
              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="dniStudent">
                  DNI del alumno:
                </FormLabel>
                <Input
                  id="dniStudent"
                  {...register("dniStudent")}
                  placeholder="Ingresa el DNI del alumno"
                  onChange={handleDniChange}
                  _focus={{
                    borderColor: "#34495E",
                    boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="studentName">
                  Nombre del alumno:
                </FormLabel>
                <Input
                  id="studentName"
                  {...register("studentName")}
                  placeholder="Esperando DNI..."
                  readOnly
                  border="none"
                  background="transparent"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ border: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="studentLastName">
                  Apellido del alumno:
                </FormLabel>
                <Input
                  id="studentLastName"
                  {...register("studentLastName")}
                  placeholder="Esperando DNI..."
                  readOnly
                  border="none"
                  background="transparent"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ border: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="year">
                  Año:
                </FormLabel>
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
                <FormLabel color="#34495E" htmlFor="trimester">
                  Trimestre:
                </FormLabel>
                <Select id="trimester" {...register("trimester")}>
                  <option value="">Selecciona el trimestre</option>
                  <option value="primero">Primero</option>
                  <option value="segundo">Segundo</option>
                  <option value="tercero">Tercero</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="subject">
                  Materia:
                </FormLabel>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Ingresa la materia"
                  _focus={{
                    borderColor: "#34495E",
                    boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="feedback">
                  Retroalimentación:
                </FormLabel>
                <Textarea
                  id="feedback"
                  {...register("feedback")}
                  rows={4}
                  placeholder="Escribe la retroalimentación"
                  _focus={{
                    borderColor: "#34495E",
                    boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                  }}
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
