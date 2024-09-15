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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendNotifications = () => {
  const [year, setYear] = useState("");
  const [shift, setShift] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [dni, setDni] = useState("");
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [message, setMessage] = useState("");

  const {
    isOpen: isNotificationOptionsOpen,
    onOpen: openNotificationOptions,
    onClose: closeNotificationOptions,
  } = useDisclosure();
  const {
    isOpen: isDniSearchOpen,
    onOpen: openDniSearch,
    onClose: closeDniSearch,
  } = useDisclosure();
  const {
    isOpen: isNotificationFormOpen,
    onOpen: openNotificationForm,
    onClose: closeNotificationForm,
  } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleYearChange = (e) => setYear(e.target.value);
  const handleShiftChange = (e) => setShift(e.target.value);
  const handleSendToChange = (e) => {
    const value = e.target.value;
    setSendTo(value);
    if (value === "student" || value === "parent") {
      openDniSearch();
    } else {
      closeDniSearch();
    }
    if (value !== "") {
      openNotificationForm();
    } else {
      closeNotificationForm();
    }
  };

  const handleDniChange = (e) => setDni(e.target.value);

  const searchDni = async () => {
    // Aquí deberías implementar la lógica para buscar el estudiante o padre por DNI.
    // Por ejemplo, podrías hacer una llamada a una API para obtener los datos.
    // En este ejemplo, asignamos valores ficticios.
    if (dni) {
      setStudentName("Nombre del Estudiante");
      setParentName("Nombre del Padre");
    } else {
      setStudentName("");
      setParentName("");
    }
  };

  const handleSend = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    // Implementa la lógica para enviar la notificación.
    toast({
      title: "Notificación Enviada",
      description: "La notificación se ha enviado correctamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setMessage("");
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

        {/* Envuelve el formulario en una etiqueta <form> */}
        <form onSubmit={handleSend}>
          {/* Selección de Año y Turno */}
          <Box mb={6}>
            <FormControl mb={4}>
              <FormLabel color="#34495E">Año:</FormLabel>
              <Select id="year" value={year} onChange={handleYearChange}>
                <option value="">Seleccionar año</option>
                <option value="1º">1º</option>
                <option value="2º">2º</option>
                <option value="3º">3º</option>
                <option value="4º">4º</option>
                <option value="5º">5º</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel color="#34495E">Turno:</FormLabel>
              <Select id="shift" value={shift} onChange={handleShiftChange}>
                <option value="">Seleccionar turno</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
              </Select>
            </FormControl>
          </Box>

          {/* Opción de enviar a todos o a un estudiante/padre en particular */}
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

          {/* Busqueda por DNI para estudiantes o padres */}
          {sendTo === "student" || sendTo === "parent" ? (
            <Box mb={6} display={isDniSearchOpen ? "block" : "none"}>
              <FormControl mb={4}>
                <FormLabel color="#34495E">
                  Buscar por DNI del estudiante:
                </FormLabel>
                <Input
                  id="dni"
                  value={dni}
                  onChange={handleDniChange}
                  placeholder="Ingrese el DNI"
                />
              </FormControl>
              <Button onClick={searchDni} colorScheme="blue">
                Buscar
              </Button>
              <Box mt={4}>
                {studentName && (
                  <>
                    <p>
                      <strong>Nombre del estudiante:</strong> {studentName}
                    </p>
                    <p>
                      <strong>Nombre del padre:</strong> {parentName}
                    </p>
                  </>
                )}
              </Box>
            </Box>
          ) : null}

          {/* Formulario para redactar el mensaje */}
          {sendTo ? (
            <Box mb={6} display={isNotificationFormOpen ? "block" : "none"}>
              <FormControl mb={4}>
                <Textarea
                  rows={4}
                  placeholder="Escribe el mensaje aquí..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormControl>
              {/* Cambia el botón a tipo submit */}
              <Button
                mb={2}
                type="submit"
                colorScheme="orange"
                w="full" // Esto establece el ancho del botón a 200 píxeles
              >
                Enviar
              </Button>
            </Box>
          ) : null}
        </form>
      </Box>
    </Container>
  );
};

export default SendNotifications;
