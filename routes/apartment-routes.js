const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Apartment = require('../models/apartment-model');



// GET '/apartments'=> to get all the players
router.get('/apartments', (req, res, next) => {
  Player.find().populate('apartment')
    .then(allTheApartments => {
      res.json(allTheApartments);
    })
    .catch(err => {
      res.json(err);
    })
});


module.exports = router;