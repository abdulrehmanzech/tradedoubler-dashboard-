import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

type SimpleTableProps = {
  data: any[];
  columns: { key: string; header: string; render?: (row: any) => React.ReactNode }[];
  title?: string;
};

export default function SimpleTable({ data, columns, title }: SimpleTableProps) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      {title && (
        <Text mb="4" fontSize="lg" fontWeight="bold" color={textColor}>
          {title}
        </Text>
      )}
      <Table variant="simple" color="gray.500" size="sm">
        <Thead bg={useColorModeValue("gray.50", "gray.700")}>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key} borderColor={borderColor}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <Tr key={i}>
                {columns.map((col) => (
                  <Td key={col.key} borderColor={borderColor}>
                    {col.render ? col.render(row) : row[col.key] ?? "N/A"}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length} textAlign="center" py="6">
                No data available
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
