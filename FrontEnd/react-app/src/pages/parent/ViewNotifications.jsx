import {
  Box,
  Container,
  Heading,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNotificationsForParent } from "../../services/notificationService"; // Asegúrate de tener esta función

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      const dni = sessionStorage.getItem("dni");
      if (!dni) {
        toast({
          title: "Error",
          description: "No se encontró el DNI.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      try {
        const data = await getNotificationsForParent(dni);
        setNotifications(data); // Suponemos que `data` ya contiene `subject` y `sentAt`
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las notificaciones.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [toast]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setResponseMessage(""); // Reiniciar el mensaje de respuesta
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setResponseMessage(""); // Limpiar mensaje de respuesta al cerrar
  };

  const handleResponseSubmit = () => {
    // Lógica para enviar respuesta aquí
    toast({
      title: "Respuesta Enviada",
      description: "Tu respuesta ha sido enviada correctamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    closeModal();
  };

  if (loading) {
    return <Text>Cargando notificaciones...</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box
        bg="#f4f4f4"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.9)"
      >
        <Heading as="h1" mb={4} textAlign="center" color="orange.500">
          Notificaciones
        </Heading>
        {notifications.length === 0 ? (
          <Text>No tienes notificaciones.</Text>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="notification"
                onClick={() => handleNotificationClick(notification)}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedNotification?.id === notification.id
                      ? "orange.100"
                      : "white",
                }}
              >
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(notification.sentAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Asunto:</strong> {notification.subject}
                </p>
                <p>
                  <strong>Mensaje:</strong> {notification.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </Box>

      {selectedNotification && (
        <Modal isOpen={!!selectedNotification} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              as="h1"
              size="xl"
              mb={6}
              textAlign="center"
              color="orange.400"
            >
              Responder Notificación
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4} p={4} borderWidth={1} borderRadius="md" bg="#f4f4f4">
                <Text>
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedNotification.sentAt).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Asunto:</strong> {selectedNotification.subject}
                </Text>
                <Text>
                  <strong>Mensaje:</strong> {selectedNotification.message}
                </Text>
                <Textarea
                  mt={4}
                  bg="white"
                  placeholder="Escribe tu respuesta aquí..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={handleResponseSubmit}>
                Enviar
              </Button>
              <Button ml={3} onClick={closeModal}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ViewNotifications;
