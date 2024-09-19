import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  sendNotificationToAll,
  sendNotificationToStudent,
  sendNotificationToParent,
} from "../../services/notificationService";
import { verifyChildByDni } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

const SendNotifications = () => {
  const [year, setYear] = useState("");
  const [session, setSession] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [dni, setDni] = useState("");
  const [fullName, setFullName] = useState("");
  const [parentFullName, setParentFullName] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(""); // Estado para el asunto
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleYearChange = (e) => setYear(e.target.value);
  const handleSessionChange = (e) => setSession(e.target.value);
  const handleSendToChange = (e) => {
    const value = e.target.value;
    setSendTo(value);
    if (value === "student" || value === "parent") {
      setDni("");
      setFullName("");
      setParentFullName("");
    }
  };

  const handleDniChange = (e) => setDni(e.target.value);

  const searchDni = async () => {
    if (dni.length === 8) {
      try {
        const studentData = await verifyChildByDni(dni);
        if (studentData) {
          const nameStudent = `${studentData.firstName || ""} ${
            studentData.lastName || ""
          }`.trim();
          setFullName(nameStudent);
          setParentFullName(
            `${studentData.parentName || ""} ${
              studentData.parentLastName || ""
            }`.trim()
          );
          setYear(studentData.year);
          setSession(studentData.session);
        } else {
          setFullName("");
          setParentFullName("");
          setYear("");
          setSession("");
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
        setFullName("");
        setParentFullName("");
        setYear("");
        setSession("");
      }
    } else {
      setFullName("");
      setParentFullName("");
      setYear("");
      setSession("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!year || !session || !sendTo || !message || !subject) {
        // Verificar si el asunto está presente
        throw new Error("Por favor, completa todos los campos.");
      }

      let payload;

      if (sendTo === "all") {
        payload = {
          year,
          session,
          targetGroup: "course",
          subject, // Añadir el asunto
          message,
        };
        await sendNotificationToAll(payload);
      } else if (sendTo === "student") {
        if (!dni)
          throw new Error("DNI es requerido para enviar a un estudiante.");
        payload = {
          year,
          session,
          dni,
          targetGroup: "student",
          subject, // Añadir el asunto
          message,
        };
        await sendNotificationToStudent(payload);
      } else if (sendTo === "parent") {
        if (!dni) throw new Error("DNI es requerido para enviar a un padre.");
        payload = {
          year,
          session,
          dni,
          targetGroup: "parent",
          subject, // Añadir el asunto
          message,
        };
        await sendNotificationToParent(payload);
      }

      console.log("Datos a enviar:", payload);

      toast({
        title: "Notificación Enviada",
        description: "La notificación se ha enviado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setYear("");
      setSession("");
      setSendTo("");
      setDni("");
      setFullName("");
      setParentFullName("");
      setMessage("");
      setSubject(""); // Limpiar el asunto
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.message || "Hubo un problema al enviar la notificación.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={6} textAlign="center" color="orange.500">
          Enviar Notificación
        </Heading>

        <form onSubmit={handleSend}>
          <Box mb={6}>
            <FormControl mb={4}>
              <FormLabel color="#34495E">Año:</FormLabel>
              <Select id="year" value={year} onChange={handleYearChange} isReadOnly>
                <option value="">Seleccionar año</option>
                <option value="1">1º</option>
                <option value="2">2º</option>
                <option value="3">3º</option>
                <option value="4">4º</option>
                <option value="5">5º</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel color="#34495E">Turno:</FormLabel>
              <Select
                id="session"
                value={session}
                onChange={handleSessionChange}
                isReadOnly
              >
                <option value="">Seleccionar turno</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
              </Select>
            </FormControl>
          </Box>

          <Box mb={6}>
            <FormControl>
              <FormLabel color="#34495E">Enviar a:</FormLabel>
              <Select id="send-to" value={sendTo} onChange={handleSendToChange}>
                <option value="" disabled>
                  Elige una opción
                </option>
                <option value="all">Todos los estudiantes y padres</option>
                <option value="student">Estudiante en particular</option>
                <option value="parent">Padre en particular</option>
              </Select>
            </FormControl>
          </Box>

          {(sendTo === "student" || sendTo === "parent") && (
            <Box mb={6}>
              <FormControl mb={4}>
                <FormLabel color="#34495E">Buscar por DNI:</FormLabel>
                <Input
                  id="dni"
                  value={dni}
                  onChange={handleDniChange}
                  placeholder="Ingrese el DNI"
                />
              </FormControl>
              <Button onClick={searchDni} colorScheme="blue" isDisabled={!dni}>
                Buscar
              </Button>
              <Box mt={4}>
                {fullName && (
                  <p>
                    <strong>Nombre del estudiante:</strong> {fullName}
                  </p>
                )}
                {parentFullName && (
                  <p>
                    <strong>Nombre del padre:</strong> {parentFullName}
                  </p>
                )}
              </Box>
            </Box>
          )}

          {sendTo && (
            <Box mb={6}>
              <FormControl mb={4}>
                <FormLabel color="#34495E">Asunto</FormLabel>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)} // Capturar el valor del asunto
                  placeholder="Ingrese el asunto"
                />
              </FormControl>
              <FormControl mb={4}>
                <Textarea
                  rows={4}
                  placeholder="Escribe el mensaje aquí..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormControl>
              <Button
                mb={2}
                type="submit"
                colorScheme="orange"
                w="full"
                isLoading={loading}
              >
                Enviar
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default SendNotifications;
