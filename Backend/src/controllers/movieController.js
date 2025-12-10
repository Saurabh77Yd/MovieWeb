const Movie = require('../models/Movie');
const ResponseHandler = require('../utils/responseHandler');
const User = require('../models/User'); 

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      const movies = await Movie.find()
        .populate('addedBy', 'username email role') 
        .sort({ createdAt: -1 });
      ResponseHandler.success(res, movies, 'Movies retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSortedMovies(req, res, next) {
    try {
      const { sortBy = 'name', order = 'asc' } = req.query;
      const sortOrder = order === 'asc' ? 1 : -1;
      const sortObj = { [sortBy]: sortOrder };
      
      const movies = await Movie.find()
        .populate('addedBy', 'username email role') 
        .sort(sortObj);
      ResponseHandler.success(res, movies, 'Sorted movies retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async searchMovies(req, res, next) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return ResponseHandler.error(res, 'Search query is required', 400);
      }

      const movies = await Movie.find({
        $text: { $search: query }
      })
      .populate('addedBy', 'username email role') 
      .sort({ score: { $meta: 'textScore' } });
      
      ResponseHandler.success(res, movies, 'Search results retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async addMovie(req, res, next) {
    try {
      const movieData = { ...req.body, addedBy: req.user._id };
      const movie = await Movie.create(movieData);

     
      const populatedMovie = await Movie.findById(movie._id)
        .populate('addedBy', 'username email role');

      ResponseHandler.success(
        res, 
        populatedMovie, 
        'Movie added successfully', 
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      )
      .populate('addedBy', 'username email role'); 

      if (!movie) {
        return ResponseHandler.error(res, 'Movie not found', 404);
      }

      ResponseHandler.success(res, movie, 'Movie updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByIdAndDelete(id);

      if (!movie) {
        return ResponseHandler.error(res, 'Movie not found', 404);
      }

      ResponseHandler.success(res, null, 'Movie deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  
  static async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id)
        .populate('addedBy', 'username email role');

      if (!movie) {
        return ResponseHandler.error(res, 'Movie not found', 404);
      }

      ResponseHandler.success(res, movie, 'Movie retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;