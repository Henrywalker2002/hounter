import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    id: 1,
    title: 'dashboadNavbar.statistical',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    id: 2,
    title: 'dashboadNavbar.recruitment',
    path: '/dashboard/recruitment',
    icon: icon('ic_lock'),
  },
  {
    id: 3,
    title: 'dashboadNavbar.event',
    path: '/dashboard/event',
    icon: icon('ic_user'),
  },
  {
    id: 4,
    title: 'dashboadNavbar.candidate',
    icon: icon('ic_cart'),
    sublinks: [
      {
        title: 'dashboadNavbar.list',
        path: '/dashboard/candidatelists',
        icon: <HourglassEmptyIcon fontSize="small" />,
      },
      {
        title: 'Blacklist',
        path: '/dashboard/blacklists',
        icon: <BlockTwoToneIcon fontSize="small" />,
      },
    ],
  },
  {
    id: 5,
    title: 'dashboadNavbar.interviewer',
    path: '/dashboard/interviewers',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
