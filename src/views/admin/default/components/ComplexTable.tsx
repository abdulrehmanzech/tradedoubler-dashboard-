import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { EnhancedMenu } from 'app/admin/default/EnhancedMenu';
import Card from 'components/card/Card';
import * as React from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

type ComplexTableProps = {
  tableData: any[];
  columnsData: any[];
  title?: string;
  enableHorizontalScroll?: boolean;
  loading?: boolean;
  onPanelChange?: (panelId: string) => void;
  selectedPanel?: string;
  isSearch?: boolean;
};

export default function ComplexTable({
  tableData,
  columnsData,
  title,
  enableHorizontalScroll = false,
  loading = false,
  onPanelChange,
  selectedPanel,
  isSearch = false,
}: ComplexTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const debouncedSearch = useDebounce(searchTerm, 300); // ✅ smooth typing

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // ✅ Filter with debounced search
  const filteredData = React.useMemo(() => {
    if (!debouncedSearch) return tableData;
    return tableData.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(debouncedSearch.toLowerCase()),
      ),
    );
  }, [debouncedSearch, tableData]);

  const table = useReactTable({
    data: filteredData,
    columns: columnsData,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 5;

  const currentRows = table
    .getRowModel()
    .rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return (
    <Card flexDirection="column" w="100%" px="0px">
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {title || 'Complex Table'}
        </Text>

        <Flex align="center" gap={3}>
          {/* ✅ Modern Search Input */}
          {isSearch && (
            <InputGroup w="280px">
              <InputLeftElement pointerEvents="none">
                <Icon as={SearchIcon} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search..."
                size="md"
                borderRadius="full"
                bg={useColorModeValue('gray.100', 'gray.700')}
                _hover={{ bg: useColorModeValue('white', 'gray.600') }}
                _focus={{
                  bg: useColorModeValue('white', 'gray.600'),
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px #4299e1',
                }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageIndex(0);
                }}
              />
            </InputGroup>
          )}

          <EnhancedMenu
            onPanelChange={onPanelChange}
            selectedPanel={selectedPanel}
          />
        </Flex>
      </Flex>

      {/* ✅ Table */}
      <Box overflowX={enableHorizontalScroll ? 'auto' : 'hidden'}>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {currentRows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: '14px' }}
                    borderColor="transparent"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* ✅ Pagination */}
      <Flex justify="center" mt="4" gap="4" align="center">
        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          isDisabled={pageIndex === 0}
        >
          Previous
        </Button>

        <Text fontSize="sm" color="gray.600">
          Page <b>{pageIndex + 1}</b> of{' '}
          <b>{Math.ceil(table.getRowModel().rows.length / pageSize)}</b>
        </Text>

        <Button
          size="sm"
          colorScheme="blue"
          variant="solid"
          onClick={() =>
            setPageIndex((prev) =>
              (prev + 1) * pageSize < table.getRowModel().rows.length
                ? prev + 1
                : prev,
            )
          }
          isDisabled={
            (pageIndex + 1) * pageSize >= table.getRowModel().rows.length
          }
        >
          Next
        </Button>
      </Flex>
    </Card>
  );
}
