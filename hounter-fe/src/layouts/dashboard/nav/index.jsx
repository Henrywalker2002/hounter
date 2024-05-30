import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Drawer } from '@mui/material';

import useResponsive from '../../../hooks/useResponsive';
import SvgColor from '../../../components/svg-color';

import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig from './config';
import { decodeJwt } from '../../../utils/deCode';
import { storage } from '../../../services/storage';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const NAV_WIDTH = 280;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { t } = useTranslation();
  const isDesktop = useResponsive('up', 'lg');
  const { pathname } = useLocation();
  const token = storage.getCache('access_token');
  const navTemp = [...navConfig];
  const [navigation, setNavigation] = useState(navTemp);

  useEffect(() => {
    let role = '';
    if (token) {
      const { Roles } = decodeJwt(token);
      role = Roles[0];
    }
    const navTemp = [...navConfig];
    if (role !== 'RECRUITMENTER') {
      navTemp.push({
        title: t('dashboadNavbar.account'),
        path: '/dashboard/accounts',
        icon: icon('ic_disabled'),
      });
    }
    setNavigation(navTemp);
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 1, display: 'inline-flex', justifyContent: 'center' }}>
        <Logo />
      </Box>

      <NavSection data={navigation} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
