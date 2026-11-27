const mongoose = require('mongoose');

const iemReviewSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: [true, 'Nama model IEM wajib diisi'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Nama brand wajib diisi'],
      trim: true,
    },
    driverConfig: {
      type: String,
      required: [true, 'Konfigurasi driver wajib diisi'],
      trim: true,
    },
    soundSignature: {
      type: String,
      enum: ['Warm Bass', 'V-Shaped', 'Neutral', 'Smooth Treble', 'Balanced'],
      default: 'Balanced',
    },
    bassRating: {
      type: Number,
      min: [1, 'Rating bass minimal 1'],
      max: [10, 'Rating bass maksimal 10'],
      required: [true, 'Rating bass wajib diisi'],
    },
    trebleRating: {
      type: Number,
      min: [1, 'Rating treble minimal 1'],
      max: [10, 'Rating treble maksimal 10'],
      required: [true, 'Rating treble wajib diisi'],
    },
    overallRating: {
      type: Number,
      min: [1, 'Rating keseluruhan minimal 1'],
      max: [10, 'Rating keseluruhan maksimal 10'],
      required: [true, 'Rating keseluruhan wajib diisi'],
    },
    reviewNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('IemReview', iemReviewSchema);