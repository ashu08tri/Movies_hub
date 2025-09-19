import * as React from 'react';
import { Form } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';
import { Backdrop, Modal, Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 390,
  bgcolor: '#000',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const drawerWidth = 240;

export default function MainNavigation(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'black', height: '100vh' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'yellow' }}>
      <NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined}>MoviesHub</NavLink>
      </Typography>
      <Divider style={{ backgroundColor: 'white' }} />
      <List>
      <ListItem>
          <ListItemButton>
            <ListItemText sx={{ textAlign: 'center' }}>
              <NavLink to='/about'>About</NavLink>
            </ListItemText>

          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Form method='get' action='movie'>
              <TextField id="filled-basic" name='search' defaultValue='' size="small" placeholder='Search Movies...' required sx={{ width: '70%', input: { color: 'yellow' } }} />
              <Button type='submit' size='small' onClick={handleClose} variant="contained" color="success" sx={{ m: '4px' }}>Search</Button>
            </Form>
          </Box>
        </Fade>
      </Modal>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" position='static' sx={{ bgcolor: 'black' , m: '0'}}>
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
              sx={{ flexGrow: 1, display: { sm: 'block', xs: 'none' }, color: 'yellow' }}
            >
              <NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined}> MoviesHub</NavLink>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button><NavLink to='/about'>About</NavLink></Button>
            </Box>
            <Box sx={{ ml: 6 }}>
              <Form method='get' action='movie' style={{ display: 'flex' }}>
                <TextField id="filled-basic" name='search' defaultValue='' size="small" placeholder='Search Movies...' required sx={{ display: { xs: 'none', md: 'block' },input: { color: 'yellow' }}} />
                <Button type='submit' sx={{ display: { xs: 'none', md: 'block' }, ml: '3px' }} size='small' variant="contained" color="success">Search</Button>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '70vw', justifyContent: 'end'}}>
                  <IconButton color="inherit" edge="end" size="small" onClick={handleOpen}><SearchIcon /></IconButton>
                </Box>
              </Form>
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
      </Box>
    </>
  );
}
