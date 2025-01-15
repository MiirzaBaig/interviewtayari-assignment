// routes/interviews.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Interview = require('../models/Interview');

// Get interviews for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    // Fetch interviews only for the authenticated user
    const interviews = await Interview.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create new interview
router.post('/', auth, async (req, res) => {
  try {
    const { name, country, company, questions } = req.body;
    
    const interview = new Interview({
      name,
      country,
      company,
      questions,
      userId: req.user.id
    });

    await interview.save();
    res.json(interview);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update interview
router.put('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }

    // Make sure user owns interview
    if (interview.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedInterview);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete interview
router.delete('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }

    // Make sure user owns interview
    if (interview.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await interview.remove();
    res.json({ msg: 'Interview removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;