import { generateToken } from "./tokenUtils";

export const mockUsers = [
  {
    id: 1,
    username: "Juan Perez",
    email: "admin.juan@example.com",
    password: "1234",
    role: "ADMIN",
  },
  {
    id: 2,
    username: "Maria Lopez",
    email: "teacher.maria@example.com",
    password: "1234",
    role: "TEACHER",
  },
  {
    id: 3,
    username: "Carlos García",
    email: "student.carlos@example.com",
    password: "1234",
    role: "STUDENT",
  },
  {
    id: 4,
    username: "Juana Ramirez",
    email: "tutor.juana@example.com",
    password: "1234",
    role: "TUTOR",
  },
];

// Authenticate user and return a token
export const authenticateUser = (email, password) => {
  const user = mockUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    const token = generateToken(user);
    return { user, token };
  }
  return null;
};
