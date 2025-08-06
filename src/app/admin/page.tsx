'use client';

import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import TotalSpent from 'views/admin/default/components/TotalSpent';
// Assets
import { useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import PromotionalOffer from './default/PromotionalOffer';
type RowObj = {
  name: string;
  tech: string[]; 
  date: string;
  progress: number; 
};

export default function Default() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const [complexTableData, setComplexTableData] = useState<RowObj[]>([]);
  const [percentageVouchers, setPercentageVouchers] = useState<any[]>([]);

  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  const [totalSpent, setTotalSpent] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [status, setStatus] = useState('');
  const columnHelper = createColumnHelper<any>();

  const complexTableColumns = [
    columnHelper.accessor('programName', {
      header: 'Program Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('discountAmount', {
      header: 'Discount',
      cell: (info) => `${info.getValue()} EUR`,
    }),
    columnHelper.accessor('isPercentage', {
      header: 'Is %',
      cell: (info) => (info.getValue() ? 'Yes' : 'No'),
    }),
    columnHelper.accessor('updateDate', {
      header: 'Updated At',
      cell: (info) => new Date(Number(info.getValue())).toLocaleDateString(),
    }),
  ];
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch('/api/vouchers');
        const data = await res.json();
        setVouchers(data);
        setComplexTableData(data); // raw data

        const revenueSeries = {
          name: 'Discounts',
          data: data.map((item: any) => item.discountAmount || 0),
        };

        const profitSeries = {
          name: 'Programs',
          data: data.map((_: any, i: any) => (i + 1) * 10),
        };

        setChartData([revenueSeries, profitSeries]);
        const total = discounts.reduce((acc, val) => acc + val, 0);
        setTotalSpent(total);

        const len = discounts.length;
        const last = discounts[len - 1] || 0;
        const prev = discounts[len - 2] || 1; // avoid divide by 0

        const change = (((last - prev) / prev) * 100).toFixed(1);
        setChangePercent(Number(change));

        setStatus(Number(change) >= 0 ? 'On track' : 'Needs attention');

        setPercentageVouchers(data.filter((v: any) => v.isPercentage));

        // setComplexTableData(transformed);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();

    const discounts = vouchers.map((v: any) => v.discountAmount);

    const transformedData = [
      {
        name: 'Discount',
        data: discounts,
      },
    ];

    setChartData(transformedData);
  }, []);

  const totalDiscount = vouchers.reduce((acc, curr) => {
    if (curr.discountAmount && typeof curr.discountAmount === 'number') {
      return acc + curr.discountAmount;
    }
    return acc;
  }, 0);

  const percentageCount = vouchers.filter((v) => v.isPercentage).length;
  const totalVouchers = vouchers.length;

  const firstTableData = vouchers.filter((v) => v.isPercentage);
  const secondTableData = vouchers.filter((v) => !v.isPercentage);
  const xAxisLabels = vouchers.map((item) => item.name); // or publishStartDate etc.

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Total Vouchers"
          value={loading ? '...' : vouchers.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Total Discount"
          value={loading ? '...' : `${totalDiscount.toFixed(2)} EUR`}
        />
        <MiniStatistics
          // growth="+23%"
          name="Percentage Vouchers"
          value={loading ? '...' : percentageCount}
        />
        <MiniStatistics
          name="First Program"
          value={
            loading ? '...' : vouchers[0]?.programName?.slice(0, 18) || 'N/A'
          }
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="Unique Programs"
          value={
            loading
              ? '...'
              : [...new Set(vouchers.map((v) => v.programId))].length
          }
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Avg. Discount"
          value={
            loading
              ? '...'
              : `${(totalDiscount / (vouchers.length || 1)).toFixed(2)} EUR`
          }
        />
      </SimpleGrid>
      <SimpleGrid gap="20px" mb="20px">
        <TotalSpent
          totalSpent={totalDiscount}
          changePercent={changePercent}
          status={status}
          xAxisLabels={xAxisLabels}
          chartData={chartData}
        />
      </SimpleGrid>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ComplexTable
          tableData={firstTableData}
          columnsData={complexTableColumns}
          title="Percentage Vouchers"
        />{' '}
        <ComplexTable
          tableData={secondTableData}
          columnsData={complexTableColumns}
          title="Fixed Vouchers"
        />
      </SimpleGrid>{' '}
      <SimpleGrid mb="20px">
        <PromotionalOffer />
      </SimpleGrid>
    </Box>
  );
}
