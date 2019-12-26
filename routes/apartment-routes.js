const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Apartment = require('../models/apartment-model');



// GET '/apartments'=> to get all the apartments TEST
router.get('/apartments', (req, res, next) => {
  Apartment.find()
    .then(allTheApartments => {
      res.json(allTheApartments);
    })
    .catch(err => {
      res.json(err);
    })
});


module.exports = router;