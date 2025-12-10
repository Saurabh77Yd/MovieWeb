import { useState } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Badge,
  Chip
} from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MovieIcon from '@mui/icons-material/Movie'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SearchIcon from '@mui/icons-material/Search'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    logout()
    navigate('/login')
  }

  const handleNavigation = (path) => {
    handleMenuClose()
    navigate(path)
  }

  // Check active route
  const isActive = (path) => location.pathname === path

  // Menu items for logged-in users
  const userMenuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    ...(isAdmin() ? [{ label: 'Add Movie', path: '/admin/add-movie', icon: <AddIcon /> }] : []),
  ]

  // Menu items for logged-out users
  const guestMenuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Login', path: '/login', icon: <LoginIcon /> },
    { label: 'Register', path: '/register', icon: <PersonAddIcon /> },
  ]

  const menuItems = user ? userMenuItems : guestMenuItems

  const DesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button 
        color="inherit" 
        component={Link} 
        to="/"
        startIcon={<HomeIcon />}
        sx={{
          borderRadius: 2,
          px: 2,
          bgcolor: isActive('/') ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.15),
          }
        }}
      >
        Home
      </Button>

      {isAdmin() && (
        <Button 
          color="inherit" 
          component={Link} 
          to="/admin/add-movie"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            px: 2,
            bgcolor: isActive('/admin/add-movie') ? alpha(theme.palette.success.main, 0.1) : 'transparent',
            '&:hover': {
              bgcolor: alpha(theme.palette.success.main, 0.15),
            }
          }}
        >
          Add Movie
        </Button>
      )}

      {user ? (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: user.role === 'admin' 
                  ? 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)'
                  : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1 }}>
                {user.username}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {user.role === 'admin' ? (
                  <>
                    <AdminPanelSettingsIcon sx={{ fontSize: 12 }} />
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Admin
                    </Typography>
                  </>
                ) : (
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    User
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          
          <Button 
            variant="outlined"
            size="small"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              borderRadius: 3,
              borderColor: alpha(theme.palette.error.main, 0.3),
              color: theme.palette.error.main,
              '&:hover': {
                borderColor: theme.palette.error.main,
                bgcolor: alpha(theme.palette.error.main, 0.04),
              }
            }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <Button 
            variant="outlined"
            color="inherit"
            component={Link} 
            to="/login"
            startIcon={<LoginIcon />}
            sx={{
              borderRadius: 3,
              borderColor: alpha('#fff', 0.3),
              '&:hover': {
                borderColor: '#fff',
                bgcolor: alpha('#fff', 0.1),
              }
            }}
          >
            Login
          </Button>
          <Button 
            variant="contained"
            component={Link} 
            to="/register"
            startIcon={<PersonAddIcon />}
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
              boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5d3c82 30%, #5a6fd9 90%)',
                boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .5)',
              }
            }}
          >
            Register
          </Button>
        </Box>
      )}
    </Box>
  )

  const MobileMenu = () => (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{ 
          ml: 1,
          bgcolor: alpha('#fff', 0.1),
          '&:hover': {
            bgcolor: alpha('#fff', 0.2),
          }
        }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 250,
            mt: 1.5,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User info at top */}
        {user && (
          <>
            <MenuItem sx={{ pointerEvents: 'none', py: 2 }}>
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  mr: 2,
                  bgcolor: user.role === 'admin' 
                    ? 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)'
                    : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {user.username}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  {user.role === 'admin' ? (
                    <>
                      <AdminPanelSettingsIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption" color="primary">
                        Administrator
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      User
                    </Typography>
                  )}
                </Box>
              </Box>
            </MenuItem>
            <Divider sx={{ my: 1 }} />
          </>
        )}

        {/* Navigation items */}
        {menuItems.map((item) => (
          <MenuItem 
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            sx={{
              py: 1.5,
              borderRadius: 1,
              bgcolor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.12),
              }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 2,
              color: isActive(item.path) ? theme.palette.primary.main : 'inherit'
            }}>
              {item.icon}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: isActive(item.path) ? 600 : 400 }}>
              {item.label}
            </Typography>
            {isActive(item.path) && (
              <Box sx={{ ml: 'auto', width: 6, height: 6, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
            )}
          </MenuItem>
        ))}

        {/* Logout for logged-in users */}
        {user && (
          <>
            <Divider sx={{ my: 1 }} />
            <MenuItem 
              onClick={handleLogout}
              sx={{
                py: 1.5,
                borderRadius: 1,
                color: theme.palette.error.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.08),
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <LogoutIcon />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Logout
              </Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  )

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo/Brand */}
          <Box 
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              mr: 3
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: alpha('#fff', 0.1),
                mr: 2,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <MovieFilterIcon sx={{ color: 'white' }} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.5px',
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(45deg, #fff 30%, rgba(255,255,255,0.8) 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Movie Collection
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'white',
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Movies
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation items */}
          {/* eslint-disable-next-line react-hooks/static-components */}
          {isMobile ? <MobileMenu /> : <DesktopMenu />}
        </Toolbar>
      </Container>
     
    </AppBar>
  )
}

export default Navbar