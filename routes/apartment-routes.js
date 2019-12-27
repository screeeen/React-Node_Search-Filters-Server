const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Apartment = require('../models/apartment-model');



// GET '/apartments'=> to get all the apartments TEST
router.get(
  '/apartments',
    async(req, res, next) => {
  Apartment.find()
    .then(allTheApartments => {
      res.json(allTheApartments);
    })
    .catch(err => {
      res.json(err);
    })
});


router.get(
  '/search',
  async (req, res, next) => {
    console.log('req.query', req.query);
    const { location, priceMax, priceMin, sizeMax, sizeMin, roomsNumber } = req.query;

    try {
      const apartmentsRecipe = await Apartment.find({ location: location ,$and:[{price: {$gte:priceMin}}, {price: {$lte:priceMax}}],$and:[{sqm: {$gte:sizeMin}}, {sqm: {$lte:sizeMax}}],numberOfBedrooms: {$gte:roomsNumber}});
      res.status(200).json(apartmentsRecipe);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;

