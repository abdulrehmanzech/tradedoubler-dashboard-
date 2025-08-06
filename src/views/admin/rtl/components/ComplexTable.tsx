import { Box, Flex, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
	AccessorKeyColumnDef,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';

type RowObj = Record<string, any>; // more flexible
interface ComplexTableProps {
  tableData: any[];
  columnsData: AccessorKeyColumnDef<any, any>[];
}

export default function ComplexTable({ tableData, columnsData }: ComplexTableProps) {
  const table = useReactTable({
    data: tableData,
    columns: columnsData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box 
      overflowX="auto"
      overflowY="hidden"  // Explicitly hide vertical scroll
      maxH="none"         // Remove any height constraints
      h="auto"            // Let height be automatic
    >
      <table style={{ width: '100%', tableLayout: 'auto' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: '8px', textAlign: 'left' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: '8px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

// Alternative Solution 1: Using CSS-in-JS approach
export function ComplexTableCSS({ tableData, columnsData }: ComplexTableProps) {
  const table = useReactTable({
    data: tableData,
    columns: columnsData,
    getCoreRowModel: getCoreRowModel(),
  });

  const containerStyles = {
    overflowX: 'auto' as const,
    overflowY: 'visible' as const,
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c1c1c1',
      borderRadius: '4px',
    },
  };

  return (
    <Box sx={containerStyles}>
      <table style={{ width: '100%', minWidth: 'max-content' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ padding: '8px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: '8px', whiteSpace: 'nowrap' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

// Alternative Solution 2: Using Chakra UI Table component
export function ComplexTableChakra({ tableData, columnsData }: ComplexTableProps) {
  const table = useReactTable({
    data: tableData,
    columns: columnsData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box 
      overflowX="auto"
      overflowY="hidden"
      position="relative"
    >
      <Table variant="simple" size="sm">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} whiteSpace="nowrap">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} whiteSpace="nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}