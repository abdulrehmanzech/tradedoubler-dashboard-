import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Badge
} from '@chakra-ui/react';
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings
} from 'react-icons/md';

interface EnhancedMenuProps {
  onPanelChange: (panelId: string) => void;
  selectedPanel: string;
}

export function EnhancedMenu({ onPanelChange, selectedPanel }: EnhancedMenuProps) {
  const textColor = useColorModeValue('secondaryGray.500', 'white');
  const textHover = useColorModeValue(
    { color: 'secondaryGray.900', bg: 'unset' },
    { color: 'secondaryGray.500', bg: 'unset' }
  );
  const iconColor = useColorModeValue('brand.500', 'white');
  const bgList = useColorModeValue('white', 'whiteAlpha.100');
  const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
  const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });
  
  // Move the useColorModeValue for active background to the top level
  const activeBg = useColorModeValue('blue.50', 'blue.900');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { id: 'panel1', label: 'Promotional Offers', icon: MdOutlinePerson },
    { id: 'panel2', label: 'Vouchers Management', icon: MdOutlineCardTravel },
    { id: 'panel3', label: 'HML DE', icon: MdOutlineLightbulb },
    { id: 'panel4', label: 'System Settings', icon: MdOutlineSettings }
  ];

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        alignItems='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        onClick={onOpen}
        borderRadius='10px'
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
      </MenuButton>
      <MenuList
        // w='200px'
        minW='unset'
        // maxW='400px !important'
        border='transparent'
        backdropFilter='blur(63px)'
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius='20px'
        p='15px'
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            transition='0.2s linear'
            color={textColor}
            _hover={textHover}
            p='8px'
            borderRadius='8px'
            _active={{ bg: 'transparent' }}
            _focus={{ bg: 'transparent' }}
            mb={index < menuItems.length - 1 ? '8px' : '0px'}
            onClick={() => {
              onPanelChange(item.id);
              onClose();
            }}
            bg={selectedPanel === item.id ? activeBg : 'transparent'}
          >
            <Flex align='center' gap={10} justify='space-between' w='100%'>
              <Flex align='center'>
                <Icon as={item.icon} h='16px' w='16px' me='8px' />
                <Text fontSize='sm' fontWeight='400'>
                  {item.label}
                </Text>
              </Flex>
              {selectedPanel === item.id && (
                <Badge colorScheme='blue' size='sm'>
                  Active
                </Badge>
              )}
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}