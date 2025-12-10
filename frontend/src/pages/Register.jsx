import { useState } from 'react'
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Alert, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Fade,
  Zoom,
  IconButton,
  InputAdornment,
  alpha,
  CircularProgress
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import BadgeIcon from '@mui/icons-material/Badge'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(username, email, password, role)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
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
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
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
                background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)'
              }
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                left: -50,
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(118, 75, 162, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
                zIndex: 0
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                right: -30,
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
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
                    background: alpha('#667eea', 0.1)
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
                      background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
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
                    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  Join Movie Collection
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
                  Create your account to start exploring movies
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

              {/* Registration Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      fontFamily: 'Inter, sans-serif',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha('#667eea', 0.3),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
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
                        borderColor: alpha('#667eea', 0.3),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
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
                        borderColor: alpha('#667eea', 0.3),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                      },
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: 'Inter, sans-serif',
                    }
                  }}
                />

                <FormControl 
                  fullWidth 
                  margin="normal"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: alpha('#667eea', 0.05),
                      fontFamily: 'Inter, sans-serif',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha('#667eea', 0.3),
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#667eea',
                      },
                    }
                  }}
                >
                  <InputLabel sx={{ fontFamily: 'Inter, sans-serif' }}>
                    Role
                  </InputLabel>
                  <Select
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start" sx={{ ml: 1 }}>
                        <BadgeIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="user" sx={{ fontFamily: 'Inter, sans-serif' }}>
                      User
                    </MenuItem>
                    <MenuItem value="admin" sx={{ fontFamily: 'Inter, sans-serif' }}>
                      Admin
                    </MenuItem>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? null : <PersonAddIcon />}
                  sx={{
                    mt: 4,
                    mb: 3,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                    boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .3)',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5d3c82 30%, #5a6fd9 90%)',
                      boxShadow: '0 3px 5px 2px rgba(102, 126, 234, .5)',
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
                      Creating Account...
                    </Box>
                  ) : (
                    'Create Account'
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
                  Already have an account?
                </Typography>
              </Box>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: alpha('#667eea', 0.5),
                    color: '#667eea',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#667eea',
                      background: alpha('#667eea', 0.04),
                    }
                  }}
                >
                  Sign In to Existing Account
                </Button>
              </Box>

              {/* Role Explanation */}
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: 2,
                  borderRadius: 2,
                  background: alpha('#667eea', 0.05),
                  borderLeft: '4px solid #667eea'
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.5
                  }}
                >
                  <strong>Role Information:</strong><br />
                  • <strong>User:</strong> Can browse and view all movies<br />
                  • <strong>Admin:</strong> Can add, edit, and delete movies (only those they created)
                </Typography>
              </Paper>
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

export default Register