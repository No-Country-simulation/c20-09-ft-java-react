import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Box,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const SubjectField = ({ index, register, remove, errors }) => (
  <GridItem colSpan={2}>
    <Box display="flex" alignItems="center" mb={4}>
      <FormControl isInvalid={errors[`subjects[${index}].subjectCode`]}>
        <FormLabel htmlFor={`subjects[${index}].subjectCode`}>
          Código de Materia
        </FormLabel>
        <Input
          id={`subjects[${index}].subjectCode`}
          type="text"
          placeholder="Ingrese el código de materia"
          {...register(`subjects[${index}].subjectCode`, {
            required: "Este campo es obligatorio",
          })}
        />
        {errors[`subjects[${index}].subjectCode`] && (
          <Text color="red.500">
            {errors[`subjects[${index}].subjectCode`]?.message}
          </Text>
        )}
      </FormControl>

      <FormControl isInvalid={errors[`subjects[${index}].subjectName`]} ml={4}>
        <FormLabel htmlFor={`subjects[${index}].subjectName`}>
          Nombre de la Materia
        </FormLabel>
        <Input
          id={`subjects[${index}].subjectName`}
          type="text"
          placeholder="Ingrese el nombre de la materia"
          {...register(`subjects[${index}].subjectName`, {
            required: "Este campo es obligatorio",
          })}
        />
        {errors[`subjects[${index}].subjectName`] && (
          <Text color="red.500">
            {errors[`subjects[${index}].subjectName`]?.message}
          </Text>
        )}
      </FormControl>

      <IconButton
        aria-label="Eliminar materia"
        icon={<CloseIcon />}
        colorScheme="red"
        ml={4}
        onClick={() => remove(index)}
      />
    </Box>
  </GridItem>
);

export default SubjectField;
