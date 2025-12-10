const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name is required'],
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 0,
    max: 10,
    index: true
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required'],
    index: true
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 1,
    index: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

movieSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Movie', movieSchema);
