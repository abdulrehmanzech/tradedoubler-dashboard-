import {
  Box,
  Button,
  Flex,
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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { EnhancedMenu } from 'app/admin/default/EnhancedMenu';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';

type ComplexTableProps = {
  tableData: any[];
  columnsData: any[];
  title?: string;
  enableHorizontalScroll?: boolean; // New prop for controlling scroll
  loading?: boolean;
  onPanelChange?: (panelId: string) => void;
  selectedPanel?: string;
};

type RowObj = {
  name: string;
  status: string;
  date: string;
  progress: number;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable({
  tableData,
  columnsData,
  title,
  enableHorizontalScroll = false, // Default false
  loading = false,
  onPanelChange,
  selectedPanel,
}: ComplexTableProps) {
  console.log('tableData', tableData);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const scrollbarThumbColor = useColorModeValue('gray.300', 'gray.600');
  const scrollbarTrackColor = useColorModeValue('gray.100', 'gray.700');

  let defaultData = tableData;

  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data: tableData,
    columns: columnsData,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 5;

  const currentRows = table
    .getRowModel()
    .rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  // Custom scrollbar styles - only when scroll is enabled
  const scrollbarStyles = enableHorizontalScroll
    ? {
        // Webkit browsers (Chrome, Safari, Edge)
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: scrollbarTrackColor,
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: scrollbarThumbColor,
          borderRadius: '4px',
          border: `1px solid ${scrollbarTrackColor}`,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: useColorModeValue('gray.400', 'gray.500'),
        },
        // Firefox
        scrollbarWidth: 'thin',
        scrollbarColor: `${scrollbarThumbColor} ${scrollbarTrackColor}`,
      }
    : {};

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={
        enableHorizontalScroll ? 'auto' : { sm: 'scroll', lg: 'hidden' }
      }
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {title || 'Complex Table'}
        </Text>
        {/* <Menu /> */}
        <EnhancedMenu
          onPanelChange={onPanelChange}
          selectedPanel={selectedPanel}
        />
      </Flex>

      <Box
        // Only add scroll styles when enabled
        overflowX={enableHorizontalScroll ? 'auto' : 'hidden'}
        overflowY="hidden"
        sx={scrollbarStyles}
        style={enableHorizontalScroll ? { scrollBehavior: 'smooth' } : {}}
      >
        <Table
          variant="simple"
          color="gray.500"
          mb="24px"
          mt="12px"
          // Only set minW when scroll is enabled
          minW={enableHorizontalScroll ? 'max-content' : 'auto'}
        >
          <Thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                      // Only apply minW and whiteSpace when scroll is enabled
                      minW={enableHorizontalScroll ? '150px' : 'auto'}
                      whiteSpace={enableHorizontalScroll ? 'nowrap' : 'normal'}
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
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {currentRows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        fontSize={{ sm: '14px' }}
                        // Keep original responsive minW, only add scroll-specific when needed
                        minW={
                          enableHorizontalScroll
                            ? '150px'
                            : { sm: '150px', md: '200px', lg: 'auto' }
                        }
                        whiteSpace={
                          enableHorizontalScroll ? 'nowrap' : 'normal'
                        }
                        borderColor="transparent"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

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
