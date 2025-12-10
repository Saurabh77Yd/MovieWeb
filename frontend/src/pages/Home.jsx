import { useState, useEffect, useRef } from 'react'
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Pagination, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  Button,
  Card,
  Paper,
  alpha,
  Fade,
  Zoom,
  IconButton,
  InputAdornment,
  Collapse
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import SortIcon from '@mui/icons-material/Sort'
import FilterListIcon from '@mui/icons-material/FilterList'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MovieCard from '../components/MovieCard'
import axios from 'axios'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [order, setOrder] = useState('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const moviesPerPage = 8
  const searchTimeoutRef = useRef(null)
  const searchInputRef = useRef(null)

  
  useEffect(() => {
  
    if (searchInputRef.current && isSearching && searchQuery === '') {
   
      searchInputRef.current.focus()
    }
  }, [isSearching])

  // Fetch all movies when component mounts or sort/order changes
  useEffect(() => {
    if (!isSearching) {
      fetchAllMovies()
    }
  }, [sortBy, order, isSearching])

  // Handle search - EXACTLY LIKE FIRST CODE
  useEffect(() => {
    if (isSearching && searchQuery.trim() !== '') {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      
      // Set new timeout for debounced search
      searchTimeoutRef.current = setTimeout(() => {
        fetchSearchResults()
      }, 300)
    }
    
    // Cleanup timeout
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, isSearching])

  const fetchAllMovies = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5000/api/movies/sorted?sortBy=${sortBy}&order=${order}`
      )
      setMovies(response.data.data)
      setPage(1) // Reset to first page
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSearchResults = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5000/api/movies/search?query=${searchQuery}`
      )
      setMovies(response.data.data)
      setPage(1) // Reset to first page when searching
    } catch (error) {
      console.error('Error searching movies:', error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      // Clear timeout and search immediately on submit
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      fetchSearchResults()
    } else {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    
    // If the user clears the search field, immediately show all movies
    if (value.trim() === '' && isSearching) {
      setIsSearching(false)
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
    
    // If the user starts typing in an empty field, enable searching
    if (value.trim() !== '' && !isSearching) {
      setIsSearching(true)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setIsSearching(false)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    // Focus back on input after clear
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus()
      }, 0)
    }
  }

  const handleDelete = (movieId) => {
    setMovies(movies.filter(movie => movie._id !== movieId))
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    if (isSearching) {
      setIsSearching(false)
      setSearchQuery('')
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }

  const handleOrderChange = (e) => {
    setOrder(e.target.value)
    if (isSearching) {
      setIsSearching(false)
      setSearchQuery('')
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }

  const getSortIcon = () => {
    switch(sortBy) {
      case 'rating': return <TrendingUpIcon sx={{ mr: 1 }} />
      case 'releaseDate': return <CalendarTodayIcon sx={{ mr: 1 }} />
      case 'duration': return <AccessTimeIcon sx={{ mr: 1 }} />
      default: return <SortIcon sx={{ mr: 1 }} />
    }
  }

  const indexOfLastMovie = page * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)
  const pageCount = Math.ceil(movies.length / moviesPerPage)

  if (loading && movies.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Fade in={loading}>
          <Box textAlign="center">
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                color: 'white',
                mb: 3
              }}
            />
            <Typography 
              variant="h6" 
              color="white"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 300,
                letterSpacing: 1
              }}
            >
              Loading Movies...
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
        pb: 8
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Zoom in={!loading}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                mb: 2,
                letterSpacing: '-0.5px',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Movie Collection
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              {isSearching ? `Search results for "${searchQuery}"` : 'Discover, search, and explore your favorite movies'}
            </Typography>
          </Box>
        </Zoom>

        {/* Search Section - EXACT SAME LOGIC AS FIRST CODE */}
        <Fade in={!loading}>
          <Paper 
            elevation={6}
            sx={{
              mb: 4,
              p: { xs: 2, md: 3 },
              borderRadius: 4,
              background: 'white',
              maxWidth: '800px',
              mx: 'auto',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)'
              }
            }}
          >
            <Box 
              component="form" 
              onSubmit={handleSearchSubmit}
              sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                alignItems: 'center'
              }}
            >
              <TextField
                inputRef={searchInputRef}
                fullWidth
                variant="outlined"
                placeholder="Search movies by name or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClearSearch}
                        edge="end"
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 3,
                    fontFamily: 'Inter, sans-serif',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: alpha('#2196F3', 0.3),
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3',
                    },
                  }
                }}
              />
              <Button 
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                sx={{
                  minWidth: { xs: '100%', md: '150px' },
                  height: '56px',
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .5)',
                  }
                }}
              >
                Search
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* Stats and Filters Section - Only show when NOT searching */}
        <Collapse in={!isSearching}>
          <Box>
            {/* Stats Card */}
            <Paper
              elevation={2}
              sx={{
                mb: 4,
                mt: 4,
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MovieFilterIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        {movies.length}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Total Movies
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SortIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Currently sorted by: {sortBy}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Order: {order === 'asc' ? 'Ascending' : 'Descending'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Sort Controls */}
            <Paper
              elevation={3}
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: 'white'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterListIcon color="primary" />
                  <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    Sort & Filter
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, flexGrow: 1 }}>
                  <FormControl 
                    sx={{ 
                      minWidth: { xs: '100%', sm: 200 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: alpha('#2196F3', 0.05)
                      }
                    }}
                  >
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort By"
                      onChange={handleSortChange}
                      startAdornment={getSortIcon()}
                    >
                      <MenuItem value="name">Name</MenuItem>
                      <MenuItem value="rating">Rating</MenuItem>
                      <MenuItem value="releaseDate">Release Date</MenuItem>
                      <MenuItem value="duration">Duration</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl 
                    sx={{ 
                      minWidth: { xs: '100%', sm: 200 },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: alpha('#2196F3', 0.05)
                      }
                    }}
                  >
                    <InputLabel>Order</InputLabel>
                    <Select
                      value={order}
                      label="Order"
                      onChange={handleOrderChange}
                    >
                      <MenuItem value="asc">Ascending</MenuItem>
                      <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Collapse>

        {/* Search Results Status - Only when searching */}
        {isSearching && (
          <Fade in={isSearching}>
            <Paper
              elevation={2}
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: loading ? alpha('#2196F3', 0.1) : alpha('#4CAF50', 0.1),
                borderLeft: `4px solid ${loading ? '#2196F3' : '#4CAF50'}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    color: loading ? '#2196F3' : '#2E7D32'
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={24} />
                      Searching for "{searchQuery}"...
                    </Box>
                  ) : (
                    movies.length === 0 
                      ? `No movies found matching "${searchQuery}"`
                      : `Found ${movies.length} movies matching "${searchQuery}"`
                  )}
                </Typography>
                
                <Button
                  variant="outlined"
                  onClick={handleClearSearch}
                  startIcon={<ClearIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Clear Search
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}

        {/* Movies Grid */}
        <Box sx={{ mt: isSearching ? 0 : 2 }}>
          {movies.length === 0 && !isSearching && !loading ? (
            <Zoom in={!loading}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 6,
                  borderRadius: 3,
                  background: 'white',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                <MovieFilterIcon sx={{ fontSize: 80, color: '#9e9e9e', mb: 3 }} />
                <Typography 
                  variant="h4" 
                  color="text.secondary"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    mb: 2
                  }}
                >
                  No Movies Found
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Be the first to add some amazing movies to the collection!
                </Typography>
              </Card>
            </Zoom>
          ) : (
            <>
              <Grid container spacing={3}>
                {currentMovies.map((movie, index) => (
                  <Grid 
                    item 
                    key={movie._id} 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3}
                  >
                    <Zoom in={!loading} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Box>
                        <MovieCard movie={movie} onDelete={handleDelete} />
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {pageCount > 1 && (
                <Fade in={!loading}>
                  <Paper
                    elevation={3}
                    sx={{
                      mt: 6,
                      p: 3,
                      borderRadius: 3,
                      background: 'white',
                      maxWidth: 'fit-content',
                      mx: 'auto'
                    }}
                  >
                    <Pagination 
                      count={pageCount} 
                      page={page} 
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                      sx={{
                        '& .MuiPaginationItem-root': {
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                          '&.Mui-selected': {
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white',
                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                          }
                        }
                      }}
                    />
                  </Paper>
                </Fade>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Home