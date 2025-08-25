'use client';

import {
  Box,
  SimpleGrid,
  Badge,
  Text,
} from '@chakra-ui/react';
import ComplexTable from 'views/admin/default/components/ComplexTable';
// Assets
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

export default function AllProducts() {
  const [promotionalOffers, setPromotionalOffers] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [hmlDeData, setHmlDeData] = useState<any[]>([]); // New state for HML DE data
  const [loading, setLoading] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState('promotional');

  const columnHelper = createColumnHelper<any>();

  // Promotional Offer Columns (Original - your current data)
  const promotionalColumns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('programName', {
      header: 'Program Name',
      cell: (info) => (
        <Text maxW="200px" isTruncated title={info.getValue()}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      cell: (info) => (
        <Badge colorScheme="blue" fontSize="xs">
          {info.getValue() || 'N/A'}
        </Badge>
      ),
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => (
        <Text maxW="250px" isTruncated title={info.getValue()}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('discountAmount', {
      header: 'Discount',
      cell: (info) => {
        const row = info.row.original;
        const amount = info.getValue();
        const isPercentage = row.isPercentage;
        const currency = row.currencyId || 'EUR';
        
        if (amount === 0) return 'N/A';
        
        return isPercentage 
          ? `${amount}%` 
          : `${amount} ${currency}`;
      },
    }),
    columnHelper.accessor('isPercentage', {
      header: 'Type',
      cell: (info) => (
        <Badge colorScheme={info.getValue() ? 'green' : 'orange'} fontSize="xs">
          {info.getValue() ? 'Percentage' : 'Fixed'}
        </Badge>
      ),
    }),
    columnHelper.accessor('voucherTypeId', {
      header: 'Voucher Type',
      cell: (info) => {
        const typeMap = {
          1: 'Code',
          2: 'Offer',
          4: 'Free Shipping',
          5: 'Special',
          6: 'Promotion'
        };
        return (
          <Badge colorScheme="purple" fontSize="xs">
            {typeMap[info.getValue() as keyof typeof typeMap] || `Type ${info.getValue()}`}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('startDate', {
      header: 'Start Date',
      cell: (info) => {
        const timestamp = info.getValue();
        return timestamp 
          ? new Date(Number(timestamp)).toLocaleDateString('en-GB')
          : 'N/A';
      },
    }),
    columnHelper.accessor('endDate', {
      header: 'End Date',
      cell: (info) => {
        const timestamp = info.getValue();
        return timestamp 
          ? new Date(Number(timestamp)).toLocaleDateString('en-GB')
          : 'N/A';
      },
    }),
    columnHelper.accessor('updateDate', {
      header: 'Updated At',
      cell: (info) => new Date(Number(info.getValue())).toLocaleDateString('en-GB'),
    }),
    columnHelper.accessor('currencyId', {
      header: 'Currency',
      cell: (info) => (
        <Badge colorScheme="gray" fontSize="xs">
          {info.getValue() || 'N/A'}
        </Badge>
      ),
    }),
    columnHelper.accessor('languageId', {
      header: 'Language',
      cell: (info) => (
        <Badge colorScheme="cyan" fontSize="xs">
          {info.getValue()?.toUpperCase() || 'N/A'}
        </Badge>
      ),
    }),
    columnHelper.accessor('exclusive', {
      header: 'Exclusive',
      cell: (info) => (
        <Badge colorScheme={info.getValue() ? 'red' : 'gray'} fontSize="xs">
          {info.getValue() ? 'Yes' : 'No'}
        </Badge>
      ),
    }),
    columnHelper.accessor('siteSpecific', {
      header: 'Site Specific',
      cell: (info) => (
        <Badge colorScheme={info.getValue() ? 'yellow' : 'gray'} fontSize="xs">
          {info.getValue() ? 'Yes' : 'No'}
        </Badge>
      ),
    }),
    columnHelper.accessor('shortDescription', {
      header: 'Description',
      cell: (info) => (
        <Text maxW="300px" isTruncated title={info.getValue()}>
          {info.getValue() || 'N/A'}
        </Text>
      ),
    }),
  ];

  // Voucher Columns (Simplified - your voucher API data)
  const voucherColumns = [
    columnHelper.accessor('programName', {
      header: 'Program Name',
      cell: (info) => (
        <Text maxW="200px" isTruncated title={info.getValue()}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('discountAmount', {
      header: 'Discount',
      cell: (info) => `${info.getValue()} EUR`,
    }),
    columnHelper.accessor('isPercentage', {
      header: 'Is %',
      cell: (info) => (
        <Badge colorScheme={info.getValue() ? 'green' : 'orange'} fontSize="xs">
          {info.getValue() ? 'Yes' : 'No'}
        </Badge>
      ),
    }),
    columnHelper.accessor('updateDate', {
      header: 'Updated At',
      cell: (info) => new Date(Number(info.getValue())).toLocaleDateString('en-GB'),
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      cell: (info) => (
        <Badge colorScheme="blue" fontSize="xs">
          {info.getValue() || 'N/A'}
        </Badge>
      ),
    }),
    columnHelper.accessor('voucherTypeId', {
      header: 'Voucher Type',
      cell: (info) => {
        const typeMap = {
          1: 'Code',
          2: 'Offer',
          4: 'Free Shipping',
          5: 'Special',
          6: 'Promotion'
        };
        return (
          <Badge colorScheme="purple" fontSize="xs">
            {typeMap[info.getValue() as keyof typeof typeMap] || `Type ${info.getValue()}`}
          </Badge>
        );
      },
    }),
  ];

  // HML DE Columns - Based on your data structure, adjust as needed
  const hmlDeColumns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('programName', {
      header: 'Program Name',
      cell: (info) => (
        <Text maxW="200px" isTruncated title={info.getValue()}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('code', {
      header: 'Code',
      cell: (info) => (
        <Badge colorScheme="teal" fontSize="xs">
          {info.getValue() || 'N/A'}
        </Badge>
      ),
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => (
        <Text maxW="250px" isTruncated title={info.getValue()}>
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('discountAmount', {
      header: 'Discount',
      cell: (info) => {
        const row = info.row.original;
        const amount = info.getValue();
        const isPercentage = row.isPercentage;
        const currency = row.currencyId || 'EUR';
        
        if (amount === 0) return 'N/A';
        
        return isPercentage 
          ? `${amount}%` 
          : `${amount} ${currency}`;
      },
    }),
    columnHelper.accessor('isPercentage', {
      header: 'Type',
      cell: (info) => (
        <Badge colorScheme={info.getValue() ? 'green' : 'orange'} fontSize="xs">
          {info.getValue() ? 'Percentage' : 'Fixed'}
        </Badge>
      ),
    }),
    columnHelper.accessor('voucherTypeId', {
      header: 'Voucher Type',
      cell: (info) => {
        const typeMap = {
          1: 'Code',
          2: 'Offer',
          4: 'Free Shipping',
          5: 'Special',
          6: 'Promotion'
        };
        return (
          <Badge colorScheme="purple" fontSize="xs">
            {typeMap[info.getValue() as keyof typeof typeMap] || `Type ${info.getValue()}`}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('startDate', {
      header: 'Start Date',
      cell: (info) => {
        const timestamp = info.getValue();
        return timestamp 
          ? new Date(Number(timestamp)).toLocaleDateString('en-GB')
          : 'N/A';
      },
    }),
    columnHelper.accessor('endDate', {
      header: 'End Date',
      cell: (info) => {
        const timestamp = info.getValue();
        return timestamp 
          ? new Date(Number(timestamp)).toLocaleDateString('en-GB')
          : 'N/A';
      },
    }),
    columnHelper.accessor('updateDate', {
      header: 'Updated At',
      cell: (info) => new Date(Number(info.getValue())).toLocaleDateString('en-GB'),
    }),
    columnHelper.accessor('shortDescription', {
      header: 'Description',
      cell: (info) => (
        <Text maxW="300px" isTruncated title={info.getValue()}>
          {info.getValue() || 'N/A'}
        </Text>
      ),
    }),
  ];

  useEffect(() => {
    const fetchPromotionalOffers = async () => {
      try {
        const res = await fetch('/api/promotional-offer');
        const data = await res.json();
        setPromotionalOffers(data);
      } catch (err) {
        console.error('Failed to fetch promotional offers:', err);
      }
    };

    fetchPromotionalOffers();
  }, []);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch('/api/vouchers');
        const data = await res.json();
        setVouchers(data);
      } catch (err) {
        console.error('Failed to fetch vouchers:', err);
      }
    };

    fetchVouchers();
  }, []);

  // New useEffect for HML DE data
  useEffect(() => {
    const fetchHmlDeData = async () => {
      try {
        const res = await fetch('/api/hml-de');
        const data = await res.json();
        setHmlDeData(data);
      } catch (err) {
        console.error('Failed to fetch HML DE data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHmlDeData();
  }, []);

  const getCurrentData = () => {
    switch (selectedPanel) {
      case 'promotional':
        return promotionalOffers;
      case 'vouchers':
        return vouchers;
      case 'hml-de':
        return hmlDeData;
      default:
        return promotionalOffers;
    }
  };

  const getCurrentColumns = () => {
    switch (selectedPanel) {
      case 'promotional':
        return promotionalColumns;
      case 'vouchers':
        return voucherColumns;
      case 'hml-de':
        return hmlDeColumns;
      default:
        return promotionalColumns;
    }
  };

  const getCurrentTitle = () => {
    switch (selectedPanel) {
      case 'promotional':
        return 'All Promotional Vouchers';
      case 'vouchers':
        return 'Vouchers Management';
      case 'hml-de':
        return 'HML DE Data Management';
      default:
        return 'All Promotional Vouchers';
    }
  };

  const handlePanelChange = (panelId: string) => {
    console.log('Panel changed to:', panelId);
    switch (panelId) {
      case 'panel1':
        setSelectedPanel('promotional');
        break;
      case 'panel2':
        setSelectedPanel('vouchers');
        break;
      case 'panel3':
        setSelectedPanel('hml-de');
        break;
      default:
        setSelectedPanel('promotional');
    }
  };

  // Function to get selected panel ID for ComplexTable
  const getSelectedPanelId = () => {
    switch (selectedPanel) {
      case 'promotional':
        return 'panel1';
      case 'vouchers':
        return 'panel2';
      case 'hml-de':
        return 'panel3';
      default:
        return 'panel1';
    }
  };

  return (
    <Box >
      <SimpleGrid mb="20px" spacing={{ base: '20px', xl: '20px' }}>
        <ComplexTable
          tableData={getCurrentData()}
          columnsData={getCurrentColumns()}
          title={getCurrentTitle()}
          enableHorizontalScroll={true}
          loading={loading}
          // Pass panel change handler and selected panel
          onPanelChange={handlePanelChange}
          selectedPanel={getSelectedPanelId()}
        />
      </SimpleGrid>
    </Box>
  );
}