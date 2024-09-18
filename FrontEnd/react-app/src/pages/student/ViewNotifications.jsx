import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNotificationsForStudent } from "../../services/notificationService"; // Asegúrate de importar correctamente tu servicio

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      const dni = sessionStorage.getItem("dni"); // Obtener el DNI de sessionStorage
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
        const data = await getNotificationsForStudent(dni); // Usar el DNI para obtener las notificaciones
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

    fetchNotifications(); // Llamar a la función para obtener las notificaciones
  }, [toast]);

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
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                p={4}
                borderWidth={1}
                borderRadius="md"
              >
                <Text>{notification.message}</Text>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default ViewNotifications;
