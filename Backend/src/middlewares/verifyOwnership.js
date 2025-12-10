const Movie = require('../models/Movie');

const verifyMovieOwnership = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    // Check if user is the creator of the movie
    if (movie.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        error: 'You can only edit/delete movies you created' 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = verifyMovieOwnership;