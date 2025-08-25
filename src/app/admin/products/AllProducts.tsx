'use client';

import { Box, Select, Flex, Image, Tooltip, Button, Icon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import { createColumnHelper } from '@tanstack/react-table';
import { ChevronDownIcon } from '@chakra-ui/icons';

type Offer = {
  feedId: number;
  productUrl: string;
  legacyProductUrl: string;
  priceHistory: { date: number; price: { value: string; currency: string } }[];
  modified: number;
  sourceProductId: string;
  programLogo: string;
  programName: string;
  id: string;
};

type Category = { name: string };
type ProductImage = { url: string };

type Product = {
  name: string;
  description: string;
  language: string;
  offers: Offer[];
  categories: Category[];
  productImage?: ProductImage;
};

const columnHelper = createColumnHelper<any>();

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('basic'); // dropdown selection

  useEffect(() => {
    const fetchProductsFeed = async () => {
      try {
        const res = await fetch('/api/product-feeds');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFeed();
  }, []);

  // 🔄 Build columns + rows dynamically
  let columnsData: any[] = [];
  let tableData: any[] = [];

  if (view === 'basic') {
    columnsData = [
      columnHelper.accessor('name', { header: 'Product Name' }),

      columnHelper.accessor('description', {
        header: 'Description',
        cell: (info) => {
          const desc = info.getValue();
          const [expanded, setExpanded] = useState(false);

          if (!desc) return null;

          const shortDesc = desc.length > 40 ? desc.slice(0, 40) + '...' : desc;

          return (
            <div>
              <p style={{ whiteSpace: 'pre-wrap', maxWidth: '300px' }}>
                {expanded ? desc : shortDesc}
              </p>
              {desc.length > 80 && (
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="blue"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {expanded ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('language', { header: 'Language' }),
    ];
    tableData = products;
  } else if (view === 'offers') {
    columnsData = [
      columnHelper.accessor('programName', { header: 'Program Name' }),
      columnHelper.accessor('feedId', { header: 'Feed ID' }),
      columnHelper.accessor('productUrl', {
        header: 'Product URL',
        cell: (info) => (
          <a href={info.getValue()} target="_blank" rel="noreferrer">
            Link
          </a>
        ),
      }),
      columnHelper.accessor('price', { header: 'Latest Price' }),
      columnHelper.accessor('currency', { header: 'Currency' }),
      columnHelper.accessor('modified', {
        header: 'Last Modified',
        cell: (info) => new Date(info.getValue()).toLocaleDateString('en-GB'),
      }),
    ];

    // flatten offers into rows
    tableData = products.flatMap((p) =>
      p.offers.map((o) => ({
        ...o,
        price: o.priceHistory?.[0]?.price?.value ?? 'N/A',
        currency: o.priceHistory?.[0]?.price?.currency ?? '',
      })),
    );
  } else if (view === 'categories') {
    columnsData = [
      columnHelper.accessor('productName', { header: 'Product Name' }),
      columnHelper.accessor('category', { header: 'Category' }),
    ];
    tableData = products.flatMap((p) =>
      p.categories.map((c) => ({
        productName: p.name,
        category: c.name,
      })),
    );
  } else if (view === 'images') {
    columnsData = [
      columnHelper.accessor('productName', { header: 'Product Name' }),
      columnHelper.accessor('image', {
        header: 'Image',
        cell: (info) => (
          <Image src={info.getValue()} alt="product" boxSize="100px" />
        ),
      }),
    ];
    tableData = products.map((p) => ({
      productName: p.name,
      image: p.productImage?.url,
    }));
  }

  return (
    <Box>
      {/* 🔽 Dropdown selector */}
         <Flex mb={4} gap={4}>

      <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        border="1px solid"
        borderColor="gray.300"
        bg="white"
        _hover={{ bg: "gray.50" }}
        _expanded={{ bg: "gray.100" }}
        w="250px"
        textAlign="left"
        justifyContent="space-between"
      >
        {view === "basic"
          ? "Basic Info"
          : view === "offers"
          ? "Offers"
          : view === "categories"
          ? "Categories"
          : "Images"}
      </MenuButton>
      <MenuList
        border="1px solid"
        borderColor="gray.200"
        borderRadius={8}
        boxShadow="md"
        p="4px"
      >
        <MenuItem onClick={() => setView("basic")}>Basic Info</MenuItem>
        <MenuItem onClick={() => setView("offers")}>Offers</MenuItem>
        <MenuItem onClick={() => setView("categories")}>Categories</MenuItem>
        <MenuItem onClick={() => setView("images")}>Images</MenuItem>
      </MenuList>
    </Menu>
    </Flex>


      <ComplexTable
        tableData={tableData}
        columnsData={columnsData}
        title="Product Feed"
        loading={loading}
        enableHorizontalScroll
        isSearch
      />
    </Box>
  );
}
