const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// GET /api/songs - Get all songs
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, search } = req.query;
    const query = { isActive: true };

    // Add genre filter if provided
    if (genre) {
      query.genre = new RegExp(genre, 'i');
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { artist: new RegExp(search, 'i') },
        { album: new RegExp(search, 'i') }
      ];
    }

    const songs = await Song.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Song.countDocuments(query);

    res.json({
      success: true,
      data: songs,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching songs',
      error: error.message
    });
  }
});

// GET /api/songs/:id - Get single song
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    res.json({
      success: true,
      data: song
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching song',
      error: error.message
    });
  }
});

// POST /api/songs - Create new song
router.post('/', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();

    res.status(201).json({
      success: true,
      data: song,
      message: 'Song created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating song',
      error: error.message
    });
  }
});

// PUT /api/songs/:id - Update song
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    res.json({
      success: true,
      data: song,
      message: 'Song updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating song',
      error: error.message
    });
  }
});

// DELETE /api/songs/:id - Delete song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    res.json({
      success: true,
      message: 'Song deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting song',
      error: error.message
    });
  }
});

module.exports = router;
