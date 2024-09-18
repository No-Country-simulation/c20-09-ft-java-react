// notificationService.js

import notification from "./notification";

// Función para enviar una notificación a todos los estudiantes y padres
export async function sendNotificationToAll(notificationData) {
  try {
    const response = await notification.post("/send/all", notificationData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar notificación a todos:", error);
    throw error;
  }
}

// Función para enviar una notificación a un estudiante específico
export async function sendNotificationToStudent(notificationData) {
  try {
    const response = await notification.post("/send/student", notificationData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar notificación al estudiante:", error);
    throw error;
  }
}

// Función para enviar una notificación solo al padre de un estudiante
export async function sendNotificationToParent(notificationData) {
  try {
    const response = await notification.post("/send/parent", notificationData);
    return response.data;
  } catch (error) {
    console.error("Error al enviar notificación al padre:", error);
    throw error;
  }
}

// Función para obtener notificaciones del curso
export async function getCourseNotifications(year, session, dni) {
  try {
    const response = await notification.get("/course-notifications", {
      params: { year, session, dni },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener notificaciones del curso:", error);
    throw error;
  }
}

// Función para obtener notificaciones para un estudiante específico
export async function getNotificationsForStudent(dni) {
  try {
    const response = await notification.get(`/student/${dni}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener notificaciones para el estudiante:", error);
    throw error;
  }
}

// Función para obtener notificaciones para un padre específico
export async function getNotificationsForParent(dni) {
  try {
    const response = await notification.get(`/parent/${dni}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener notificaciones para el padre:", error);
    throw error;
  }
}
