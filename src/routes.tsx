import { Icon } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdProductionQuantityLimits,
  MdOutlineLocalOffer,
  MdOutlineVolunteerActivism,
} from 'react-icons/md';
import { RiBuilding2Line, RiVolumeUpLine } from 'react-icons/ri';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/data-tables';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
    {
    name: 'Vouchers',
    layout: '/admin',
    path: '/vouchers',
    icon: <Icon as={RiBuilding2Line} width="20px" height="20px" color="inherit" />,
  },{
    name: 'Offers',
    layout: '/admin',
    path: '/offers',
    icon: <Icon as={MdOutlineLocalOffer} width="20px" height="20px" color="inherit" />,
  },{
    name: 'Products',
    layout: '/admin',
    path: '/products',
    icon: <Icon as={MdProductionQuantityLimits} width="20px" height="20px" color="inherit" />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: '/data-tables',
  // },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  // },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  // },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  // },
];

export default routes;
