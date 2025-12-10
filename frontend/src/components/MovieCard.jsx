import { Card, CardContent, CardActions, Typography, Button, Box, Chip, Avatar, alpha, Paper, Fade } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import axios from 'axios'

const MovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`http://localhost:5000/api/movies/${movie._id}`)
        onDelete(movie._id)
      } catch (error) {
        console.error('Error deleting movie:', error)
        alert('Failed to delete movie')
      }
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Check if current user is the creator of this movie
  const userId = user?._id || user?.id
  const creatorId = movie.addedBy?._id || movie.addedBy?.id
  const isMovieCreator = userId?.toString() === creatorId?.toString()

  // Show edit/delete buttons only if user is admin AND creator of this movie
  const showAdminActions = isAdmin() && isMovieCreator

  return (
    <Fade in={true}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
          }
        }}
      >
        {/* Movie Rating Badge */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 3px 5px 2px rgba(255, 152, 0, .3)'
            }}
          >
            {movie.rating.toFixed(1)}
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Movie Title */}
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              mb: 2,
              lineHeight: 1.3,
              color: 'text.primary',
              minHeight: '3em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {movie.name}
          </Typography>
          
          {/* Movie Stats */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip
              icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
              label={formatDate(movie.releaseDate)}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: alpha('#2196F3', 0.3),
                color: '#2196F3',
                '& .MuiChip-icon': {
                  color: '#2196F3'
                }
              }}
            />
            <Chip
              icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
              label={formatDuration(movie.duration)}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: alpha('#4CAF50', 0.3),
                color: '#4CAF50',
                '& .MuiChip-icon': {
                  color: '#4CAF50'
                }
              }}
            />
          </Box>

          {/* Movie Description */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph
            sx={{
              mb: 3,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '4.8em',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {movie.description}
          </Typography>

          {/* Creator Info (for admin) */}
          {isAdmin() && movie.addedBy && (
            <Paper
              elevation={0}
              sx={{
                mt: 'auto',
                p: 1.5,
                borderRadius: 2,
                background: alpha('#667eea', 0.05),
                borderLeft: '3px solid #667eea'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: '0.8rem',
                    bgcolor: isMovieCreator 
                      ? 'linear-gradient(45deg, #FF9800 30%, #FF5722 90%)'
                      : 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)'
                  }}
                >
                  {movie.addedBy.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500, display: 'block' }}>
                    Added by: {movie.addedBy.username}
                    {isMovieCreator && (
                      <Chip
                        label="You"
                        size="small"
                        sx={{
                          ml: 1,
                          height: 18,
                          fontSize: '0.65rem',
                          bgcolor: alpha('#4CAF50', 0.1),
                          color: '#4CAF50',
                          fontWeight: 500
                        }}
                      />
                    )}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {movie.addedBy.role === 'admin' && <AdminPanelSettingsIcon sx={{ fontSize: 12 }} />}
                    {movie.addedBy.role === 'admin' ? 'Administrator' : 'User'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </CardContent>

        {/* Action Buttons */}
        <CardActions 
          sx={{ 
            px: 3, 
            pb: 3, 
            pt: 0,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {showAdminActions ? (
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/admin/edit-movie/${movie._id}`)}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 2px 4px rgba(33, 150, 243, .3)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                    boxShadow: '0 3px 5px rgba(33, 150, 243, .4)',
                  }
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #FF5252 30%, #FF4081 90%)',
                  boxShadow: '0 2px 4px rgba(255, 82, 82, .3)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #D32F2F 30%, #C2185B 90%)',
                    boxShadow: '0 3px 5px rgba(255, 82, 82, .4)',
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          ) : isAdmin() && !showAdminActions ? (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography 
                variant="caption" 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  color: '#FF9800',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  p: 1,
                  borderRadius: 1,
                  background: alpha('#FF9800', 0.08)
                }}
              >
                <PersonIcon sx={{ fontSize: 14 }} />
                Can't edit - Created by another admin
              </Typography>
            </Box>
          ) : (
            // Empty space for non-admin users to maintain consistent card height
            <Box sx={{ height: 24 }} />
          )}
        </CardActions>
      </Card>
    </Fade>
  )
}

export default MovieCard