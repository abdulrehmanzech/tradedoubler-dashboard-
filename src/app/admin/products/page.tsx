'use client';

import { Box, SimpleGrid } from '@chakra-ui/react';
import AllProducts from './AllProducts';
type RowObj = {
  name: string;
  tech: string[];
  date: string;
  progress: number;
};

export default function Products() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* <SimpleGrid mb="20px"> */}
        <AllProducts />
      {/* </SimpleGrid> */}
    </Box>
  );
}
