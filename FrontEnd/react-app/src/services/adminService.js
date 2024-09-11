// src/services/adminService.js
import adminService from './admin';

// ** Teacher Services **

// Registro de profesor
export const registerTeacher = async (teacherData) => {
  try {
    const response = await adminService.post('/teacher/register', teacherData);
    return response.data;
  } catch (error) {
    console.error("Error registering teacher:", error.response?.data || error.message);
    throw error;
  }
};

// Actualización de profesor
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await adminService.put(`/teacher/update/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error("Error updating teacher:", error.response?.data || error.message);
    throw error;
  }
};

// Buscar profesor por ID
export const findTeacherById = async (id) => {
  try {
    const response = await adminService.get(`/teacher/find/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error finding teacher:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar profesor
export const deleteTeacher = async (id) => {
  try {
    await adminService.delete(`/teacher/delete/${id}`);
  } catch (error) {
    console.error("Error deleting teacher:", error.response?.data || error.message);
    throw error;
  }
};


// ** Student Services **

// Registro de estudiante
export const registerStudent = async (studentData) => {
  try {
    const response = await adminService.post('/student/register', studentData);
    return response.data;
  } catch (error) {
    console.error("Error registering student:", error.response?.data || error.message);
    throw error;
  }
};

// Actualización de estudiante
export const updateStudent = async (id, studentData) => {
  try {
    const response = await adminService.put(`/student/update/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error.response?.data || error.message);
    throw error;
  }
};

// Buscar estudiante por ID
export const findStudentById = async (id) => {
  try {
    const response = await adminService.get(`/student/find/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error finding student:", error.response?.data || error.message);
    throw error;
  }
};

// Buscar estudiante por DNI
export const findStudentByDni = async (dni) => {
  try {
    const response = await adminService.post('/student/verifyChild', { childDNI: dni });
    return response.data;
  } catch (error) {
    console.error("Error finding student:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar estudiante
export const deleteStudent = async (id) => {
  try {
    await adminService.delete(`/student/delete/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error.response?.data || error.message);
    throw error;
  }
};

// Verificar hijo por DNI
export const verifyChildByDni = async (childDNI) => {
  try {
    const response = await adminService.post('/student/verifyChild', { childDNI });
    return response.data;
  } catch (error) {
    console.error("Error verifying child by DNI:", error.response?.data || error.message);
    throw error;
  }
};


// ** Parent Services **

// Registro de padre
export const registerParent = async (parentData) => {
  try {
    const response = await adminService.post('/parent/register', parentData);
    return response.data;
  } catch (error) {
    console.error("Error registering parent:", error.response?.data || error.message);
    throw error;
  }
};

// Actualización de padre
export const updateParent = async (id, parentData) => {
  try {
    const response = await adminService.put(`/parent/update/${id}`, parentData);
    return response.data;
  } catch (error) {
    console.error("Error updating parent:", error.response?.data || error.message);
    throw error;
  }
};

// Buscar padre por ID
export const findParentById = async (id) => {
  try {
    const response = await adminService.get(`/parent/find/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error finding parent:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar padre
export const deleteParent = async (id) => {
  try {
    await adminService.delete(`/parent/delete/${id}`);
  } catch (error) {
    console.error("Error deleting parent:", error.response?.data || error.message);
    throw error;
  }
};
