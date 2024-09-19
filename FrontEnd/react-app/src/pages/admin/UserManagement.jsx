// src/UserManagement.jsx
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

const UserManagement = ({ users }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Correo Electrónico</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user, index) => (
          <Tr key={index}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <Button colorScheme="blue" mr={2}>
                Editar
              </Button>
              <Button colorScheme="red">Eliminar</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserManagement;
