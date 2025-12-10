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
  CircularProgress,
  Grid,
  Chip
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MovieIcon from '@mui/icons-material/Movie'
import DescriptionIcon from '@mui/icons-material/Description'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import axios from 'axios'

const AddMovie = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await axios.post('http://localhost:5000/api/movies', {
        ...formData,
        rating: parseFloat(formData.rating),
        duration: parseInt(formData.duration)
      })
      setSuccess('Movie added successfully! Redirecting...')
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add movie. Please check your inputs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Zoom in={true}>
          <Paper 
            elevation={10}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              mb: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)'
              }
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%)',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 4 } }}>
              {/* Header with back button */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton
                  onClick={() => navigate('/')}
                  sx={{
                    mr: 2,
                    color: 'primary.main',
                    '&:hover': {
                      background: alpha('#FF6B6B', 0.1)
                    }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h4" 
                    component="h1"
                    sx={{
                      background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <AddIcon sx={{ fontSize: 32 }} />
                    Add New Movie
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      mt: 0.5
                    }}
                  >
                    Fill in the details below to add a new movie to the collection
                  </Typography>
                </Box>
              </Box>

              {/* Alerts */}
              <Fade in={!!error || !!success}>
                <Box sx={{ mb: 3 }}>
                  {error && (
                    <Alert 
                      severity="error" 
                      icon={<CancelIcon />}
                      sx={{ 
                        borderRadius: 2,
                        borderLeft: '4px solid #f44336',
                        alignItems: 'center'
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert 
                      severity="success" 
                      icon={<CheckCircleIcon />}
                      sx={{ 
                        borderRadius: 2,
                        borderLeft: '4px solid #4caf50',
                        alignItems: 'center'
                      }}
                    >
                      {success}
                    </Alert>
                  )}
                </Box>
              </Fade>

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Movie Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Movie Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MovieIcon color="action" />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          fontFamily: 'Inter, sans-serif',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha('#FF6B6B', 0.3),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#FF6B6B',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { fontFamily: 'Inter, sans-serif' }
                      }}
                      placeholder="Enter movie title"
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon color="action" />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          fontFamily: 'Inter, sans-serif',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha('#FF6B6B', 0.3),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#FF6B6B',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { fontFamily: 'Inter, sans-serif' }
                      }}
                      placeholder="Enter movie description"
                    />
                  </Grid>

                  {/* Rating and Duration */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Rating (0-10)"
                      name="rating"
                      type="number"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                      inputProps={{ 
                        min: 0, 
                        max: 10, 
                        step: 0.1 
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <StarIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Chip 
                              label="/10" 
                              size="small" 
                              sx={{ 
                                height: 24,
                                fontSize: '0.75rem',
                                bgcolor: alpha('#FF6B6B', 0.1)
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          fontFamily: 'Inter, sans-serif',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha('#FF6B6B', 0.3),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#FF6B6B',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { fontFamily: 'Inter, sans-serif' }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Duration (minutes)"
                      name="duration"
                      type="number"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Chip 
                              label="mins" 
                              size="small" 
                              sx={{ 
                                height: 24,
                                fontSize: '0.75rem',
                                bgcolor: alpha('#4ECDC4', 0.1)
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          fontFamily: 'Inter, sans-serif',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha('#4ECDC4', 0.3),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4ECDC4',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { fontFamily: 'Inter, sans-serif' }
                      }}
                    />
                  </Grid>

                  {/* Release Date */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Release Date"
                      name="releaseDate"
                      type="date"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      required
                      InputLabelProps={{ 
                        shrink: true,
                        sx: { fontFamily: 'Inter, sans-serif' }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon color="action" />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 2,
                          fontFamily: 'Inter, sans-serif',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha('#4ECDC4', 0.3),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4ECDC4',
                          },
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2, 
                  mt: 4,
                  pt: 3,
                  borderTop: `1px solid ${alpha('#000', 0.1)}`
                }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? null : <AddIcon />}
                    sx={{
                      flex: 1,
                      py: 1.5,
                      borderRadius: 3,
                      background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                      boxShadow: '0 3px 5px 2px rgba(78, 205, 196, .3)',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff5252 30%, #26a69a 90%)',
                        boxShadow: '0 3px 5px 2px rgba(78, 205, 196, .5)',
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
                        Adding Movie...
                      </Box>
                    ) : (
                      'Add Movie'
                    )}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{
                      flex: 1,
                      py: 1.5,
                      borderRadius: 3,
                      borderColor: alpha('#FF6B6B', 0.5),
                      color: '#FF6B6B',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: '#FF6B6B',
                        background: alpha('#FF6B6B', 0.04),
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>

              {/* Form Tips */}
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: 2.5,
                  borderRadius: 2,
                  background: alpha('#4ECDC4', 0.05),
                  borderLeft: '4px solid #4ECDC4'
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.6
                  }}
                >
                  <strong>Tips for adding movies:</strong><br />
                  • Use a descriptive title that accurately represents the movie<br />
                  • Provide a detailed but concise description<br />
                  • Rating should be between 0 and 10 (decimals allowed)<br />
                  • Duration is in minutes (e.g., 120 for 2 hours)<br />
                  • Select the correct release date
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Zoom>

        {/* Footer */}
        <Fade in={true} style={{ transitionDelay: '300ms' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mt: 4,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300
            }}
          >
            Fill all required fields to add a new movie to your collection
          </Typography>
        </Fade>
      </Container>
    </Box>
  )
}

export default AddMovie;