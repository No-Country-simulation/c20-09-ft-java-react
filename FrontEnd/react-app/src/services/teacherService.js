import teacherService from "./teacher"; // Asegúrate de importar la instancia correcta

// Servicio para crear una nueva evaluación
export const loadEvaluation = async (evaluationDTO) => {
  try {
    const response = await teacherService.post("/load", evaluationDTO);
    return response.data; // Devuelve la evaluación creada
  } catch (error) {
    console.error("Error al crear la evaluación:", error);
    throw error; // Lanza el error para que pueda ser manejado por el consumidor del servicio
  }
};

// Servicio para obtener evaluaciones por DNI
export const getEvaluationsByDni = async (dni) => {
  try {
    const response = await teacherService.post("/student", { dni });
    return response.data; // Devuelve la lista de evaluaciones
  } catch (error) {
    console.error(
      "Error al obtener las evaluaciones:",
      error.response?.data || error.message
    );
    throw error; // Lanza el error para que pueda ser manejado por el consumidor del servicio
  }
};

// Servicio para verificar estudiante por DNI del padre
export const verifyStudentByParentDni = async (dni) => {
  try {
    const response = await teacherService.get(`/students/parent/${dni}`);
    return response.data; // Devuelve la información del estudiante
  } catch (error) {
    console.error(
      "Error al verificar el estudiante:",
      error.response?.data || error.message
    );
    throw error; // Lanza el error para que pueda ser manejado por el consumidor del servicio
  }
};
