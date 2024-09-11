// src/ExportData.jsx
import { Button } from "@chakra-ui/react";

const ExportData = ({ data }) => {
  const handleExport = (format) => {
    // Lógica para exportar datos en el formato seleccionado
    console.log(`Exportando datos en formato: ${format}`);
  };

  return (
    <div>
      <Button onClick={() => handleExport("csv")} colorScheme="teal" mr={4}>
        Exportar a CSV
      </Button>
      <Button onClick={() => handleExport("xlsx")} colorScheme="teal">
        Exportar a XLSX
      </Button>
    </div>
  );
};

export default ExportData;
