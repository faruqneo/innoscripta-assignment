import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from './Modal';

import PersonalizedNews from './PersonalizedNewFeed';
import SearchResult from './SearchResult';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [state, setState] = useState({});
  const [isShow, setIsShow] = React.useState<boolean>(false);

  const dataSources: string = localStorage?.getItem('dataSource') || '';

  React.useEffect(() => {
    if (dataSources === '') setIsShow(true);
  }, [dataSources]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSearchToggle = (data: any) => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
    if (data) setState(data);
  };

  const drawer = (<Box onClick={() => handleSearchToggle(null)} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      Personalized news feed
    </Typography>
    <Divider />
    <List>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={!isSearch ? 'Setting': 'Home'} onClick={() => handleSearchToggle(null)} />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>);

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      {isShow && <Modal open={isShow} handleClose={() => setIsShow(false)} handleAgree={() => { setIsShow(false); setIsSearch(true) }} />}
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Personalized news feed
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} onClick={() => handleSearchToggle(null)}>{!isSearch ? 'Setting': 'Home'}</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {!isSearch ? <SearchResult initState={state} /> : <PersonalizedNews search={(data) => handleSearchToggle(data)} />}
      </Box>
    </Box>
  );
}