const express = require('express');
const MovieController = require('../controllers/movieController');
const authenticate = require('../middlewares/auth');
const checkRole = require('../middlewares/roleCheck');
const { validateMovie } = require('../middlewares/validator');
const verifyMovieOwnership = require('../middlewares/verifyOwnership');

const router = express.Router();

router.get('/', MovieController.getAllMovies);
router.get('/sorted', MovieController.getSortedMovies);
router.get('/search', MovieController.searchMovies);

router.post('/', authenticate, checkRole('admin'), validateMovie, MovieController.addMovie);
router.put('/:id', authenticate, checkRole('admin'), verifyMovieOwnership, validateMovie, MovieController.updateMovie);
router.delete('/:id', authenticate, checkRole('admin'), verifyMovieOwnership, MovieController.deleteMovie);

module.exports = router;