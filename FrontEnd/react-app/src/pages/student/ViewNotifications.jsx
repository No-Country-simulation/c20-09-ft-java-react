import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNotificationsForStudent } from "../../services/notificationService";

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
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
        const data = await getNotificationsForStudent(dni);
        setNotifications(data);
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
  };

  const closeModal = () => {
    setSelectedNotification(null);
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
        <Heading as="h2" mb={4} textAlign="center" color="orange.500">
          Notificaciones Recibidas
        </Heading>
        {notifications.length === 0 ? (
          <Text>No tienes notificaciones.</Text>
        ) : (
          <List spacing={3}>
            {notifications.map((notification, index) => (
              <ListItem
                key={notification.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                <Text>{`Mensaje ${index + 1}`}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {selectedNotification && (
        <Modal isOpen={!!selectedNotification} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detalle Mensaje</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{selectedNotification.message}</Text>{" "}
              {/* Muestra el mensaje completo */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" onClick={closeModal}>
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
