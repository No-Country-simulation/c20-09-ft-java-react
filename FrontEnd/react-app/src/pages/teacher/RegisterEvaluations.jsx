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
  const [loading, setLoading] = useState(false);
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
      studentYear: "",
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
      setLoading(true);
      try {
        const studentData = await verifyChildByDni(dni);
        console.log(studentData); // Verifica la respuesta
        if (studentData) {
          setValue("studentName", studentData.firstName || "");
          setValue("studentLastName", studentData.lastName || "");
          setValue("studentYear", studentData.year || ""); // Asegúrate de que esto sea 'studentData.year'
        } else {
          clearStudentFields();
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
        clearStudentFields();
      } finally {
        setLoading(false);
      }
    } else {
      clearStudentFields();
    }
  };

  const clearStudentFields = () => {
    setValue("studentName", "");
    setValue("studentLastName", "");
    setValue("studentYear", "");
  };

  const onSubmit = async (data) => {
    setLoading(true);
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
        year: data.studentYear,
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
    } finally {
      setLoading(false);
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
            <Box>
              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="dniStudent">
                  DNI del alumno:
                </FormLabel>
                <Input
                  id="dniStudent"
                  {...register("dniStudent", { required: true })}
                  placeholder=""
                  onChange={handleDniChange}
                  _focus={{
                    borderColor: "#34495E",
                    boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                  }}
                />
                {errors.dniStudent && <span>DNI es requerido.</span>}
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="studentName">
                  Nombre del alumno:
                </FormLabel>
                <Input
                  id="studentName"
                  {...register("studentName")}
                  placeholder=""
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
                  placeholder=""
                  readOnly
                  border="none"
                  background="transparent"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ border: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="studentYear">
                  Año:
                </FormLabel>
                <Input
                  id="studentYear"
                  {...register("studentYear")}
                  placeholder=""
                  readOnly
                  border="none"
                  background="transparent"
                  _focus={{ boxShadow: "none" }}
                  _hover={{ border: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="trimester">
                  Trimestre:
                </FormLabel>
                <Select
                  id="trimester"
                  {...register("trimester", { required: true })}
                >
                  <option value="">Selecciona el trimestre</option>
                  <option value="primero">Primero</option>
                  <option value="segundo">Segundo</option>
                  <option value="tercero">Tercero</option>
                </Select>
                {errors.trimester && <span>Trimestre es requerido.</span>}
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="subject">
                  Materia:
                </FormLabel>
                <Input
                  id="subject"
                  {...register("subject", { required: true })}
                  placeholder=""
                  _focus={{
                    borderColor: "#34495E",
                    boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                  }}
                />
                {errors.subject && <span>Materia es requerida.</span>}
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="#34495E" htmlFor="feedback">
                  Retroalimentación:
                </FormLabel>
                <Textarea
                  id="feedback"
                  {...register("feedback", { required: true })}
                  rows={4}
                  placeholder="Escribe la retroalimentación"
                  _focus={{
                    borderColor: "#34495E",
                    boxShadow: "0 0 15px rgba(52, 73, 94, 0.5)",
                  }}
                />
                {errors.feedback && (
                  <span>Retroalimentación es requerida.</span>
                )}
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
