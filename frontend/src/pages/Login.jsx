import { useState } from 'react'
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Alert,
  Fade,
  Zoom,
  IconButton,
  InputAdornment,
  alpha,
  CircularProgress
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginIcon from '@mui/icons-material/Login'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Zoom in={true}>
          <Paper 
            elevation={10}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)'
              }
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
                zIndex: 0
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 5 } }}>
              {/* Back button */}
              <IconButton
                onClick={() => navigate('/')}
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  color: 'primary.main',
                  '&:hover': {
                    background: alpha('#2196F3', 0.1)
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              {/* Header Section */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <MovieFilterIcon 
                    sx={{ 
                      fontSize: 60,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="h3" 
                  component="h1"
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                    maxWidth: '400px',
                    mx: 'auto'
                  }}
                >
                  Sign in to access your movie collection
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Fade in={!!error}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      borderLeft: '4px solid #f44336'
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      fontFamily: 'Inter, sans-serif',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha('#2196F3', 0.3),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2196F3',
                      },
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: 'Inter, sans-serif',
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      fontFamily: 'Inter, sans-serif',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha('#2196F3', 0.3),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2196F3',
                      },
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: 'Inter, sans-serif',
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? null : <LoginIcon />}
                  sx={{
                    mt: 4,
                    mb: 3,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .5)',
                    },
                    '&.Mui-disabled': {
                      background: '#e0e0e0',
                      color: '#9e9e9e'
                    }
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={24} color="inherit" />
                      Signing In...
                    </Box>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Box>

              {/* Divider */}
              <Box sx={{ position: 'relative', textAlign: 'center', my: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: alpha('#000', 0.1)
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    backgroundColor: 'white',
                    px: 2,
                    color: 'text.secondary',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  New to Movie Collection?
                </Typography>
              </Box>

              {/* Register Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: alpha('#2196F3', 0.5),
                    color: '#2196F3',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#2196F3',
                      background: alpha('#2196F3', 0.04),
                    }
                  }}
                >
                  Create New Account
                </Button>
              </Box>

              {/* Footer Text */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 4,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                By signing in, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Box>
          </Paper>
        </Zoom>

        {/* Additional decorative element */}
        <Fade in={true} style={{ transitionDelay: '300ms' }}>
          <Typography
            variant="body2"
            color="white"
            sx={{
              textAlign: 'center',
              mt: 4,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              opacity: 0.8
            }}
          >
            © {new Date().getFullYear()} Movie Collection. All rights reserved.
          </Typography>
        </Fade>
      </Container>
    </Box>
  )
}

export default Login