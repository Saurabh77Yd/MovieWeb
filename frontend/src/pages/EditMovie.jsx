import { useState, useEffect } from 'react'
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Alert, 
  CircularProgress,
  Fade,
  Zoom,
  IconButton,
  InputAdornment,
  alpha,
  Grid,
  Chip
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MovieIcon from '@mui/icons-material/Movie'
import DescriptionIcon from '@mui/icons-material/Description'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from 'axios'

const EditMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [movieTitle, setMovieTitle] = useState('')

  useEffect(() => {
    fetchMovie()
  }, [id])

  // Use the original working method to fetch movie
  const fetchMovie = async () => {
    try {
      setLoading(true)
      setError('')
      
      // This is the original working method - fetching all movies and finding the specific one
      const response = await axios.get('http://localhost:5000/api/movies')
      const movie = response.data.data.find(m => m._id === id)
      
      if (movie) {
        setMovieTitle(movie.name)
        setFormData({
          name: movie.name,
          description: movie.description,
          rating: movie.rating,
          releaseDate: movie.releaseDate.split('T')[0],
          duration: movie.duration.toString()
        })
      } else {
        setError('Movie not found')
      }
    } catch (err) {
      console.error('Error fetching movie:', err)
      setError('Failed to fetch movie. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, {
        ...formData,
        rating: parseFloat(formData.rating),
        duration: parseInt(formData.duration)
      })
      setSuccess('Movie updated successfully! Redirecting...')
      setMovieTitle(formData.name)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update movie. Please check your inputs.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRefresh = () => {
    setError('')
    setSuccess('')
    setLoading(true)
    fetchMovie()
  }

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Fade in={loading}>
          <Box textAlign="center">
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                color: '#FF9800',
                mb: 3
              }}
            />
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 300,
                letterSpacing: 1
              }}
            >
              Loading Movie Details...
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
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
        <Zoom in={!loading}>
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
                background: 'linear-gradient(90deg, #FF9800 0%, #FF5722 100%)'
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
                background: 'linear-gradient(45deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 4 } }}>
              {/* Header with back button and refresh */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton
                  onClick={() => navigate('/')}
                  sx={{
                    mr: 2,
                    color: 'primary.main',
                    '&:hover': {
                      background: alpha('#FF9800', 0.1)
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
                      background: 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)',
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
                    <EditIcon sx={{ fontSize: 32 }} />
                    Edit Movie
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
                    {movieTitle && `Editing: ${movieTitle}`}
                  </Typography>
                </Box>
                
                <IconButton
                  onClick={handleRefresh}
                  sx={{
                    color: '#FF9800',
                    '&:hover': {
                      background: alpha('#FF9800', 0.1)
                    }
                  }}
                >
                  <RefreshIcon />
                </IconButton>
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

              {/* Form - Only show if we have data */}
              {formData.name && (
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
                              borderColor: alpha('#FF9800', 0.3),
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#FF9800',
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
                              borderColor: alpha('#FF9800', 0.3),
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#FF9800',
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
                                  bgcolor: alpha('#FF9800', 0.1)
                                }}
                              />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            fontFamily: 'Inter, sans-serif',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha('#FF9800', 0.3),
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#FF9800',
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
                                  bgcolor: alpha('#FF5722', 0.1)
                                }}
                              />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            fontFamily: 'Inter, sans-serif',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha('#FF5722', 0.3),
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#FF5722',
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
                              borderColor: alpha('#FF5722', 0.3),
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#FF5722',
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
                      disabled={submitting}
                      startIcon={submitting ? null : <EditIcon />}
                      sx={{
                        flex: 1,
                        py: 1.5,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 87, 34, .3)',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #f57c00 30%, #e64a19 90%)',
                          boxShadow: '0 3px 5px 2px rgba(255, 87, 34, .5)',
                        },
                        '&.Mui-disabled': {
                          background: '#e0e0e0',
                          color: '#9e9e9e'
                        }
                      }}
                    >
                      {submitting ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={24} color="inherit" />
                          Updating Movie...
                        </Box>
                      ) : (
                        'Update Movie'
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
                        borderColor: alpha('#FF9800', 0.5),
                        color: '#FF9800',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: '#FF9800',
                          background: alpha('#FF9800', 0.04),
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Edit Tips */}
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: 2.5,
                  borderRadius: 2,
                  background: alpha('#FF5722', 0.05),
                  borderLeft: '4px solid #FF5722'
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
                  <strong>Editing Tips:</strong><br />
                  • Make sure all information is accurate and up-to-date<br />
                  • Use descriptive text that helps users understand the movie<br />
                  • Rating should reflect the movie's quality (0-10 scale)<br />
                  • Duration should be in total minutes<br />
                  • Double-check the release date for accuracy
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Zoom>

        {/* Footer */}
        <Fade in={!loading} style={{ transitionDelay: '300ms' }}>
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
            Update the movie details and save your changes
          </Typography>
        </Fade>
      </Container>
    </Box>
  )
}

export default EditMovie;