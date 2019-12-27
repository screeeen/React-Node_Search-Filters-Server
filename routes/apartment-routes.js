const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Apartment = require('../models/apartment-model');



// GET '/apartments'=> to get all the apartments TEST
// router.get('/apartments', (req, res, next) => {
//   Apartment.find()
//     .then(allTheApartments => {
//       res.json(allTheApartments);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

/* GET '/apartments => parameters apartments*/
router.get('/apartments', function (req, res, next) {
  const { location } = req.params;
  Apartment.findById(location)
    .then((foundApartments) => {
      res
        .status(200)
        .json(foundApartments)
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});


router.get(
  '/search',
  async (req, res, next) => {
    console.log('req.query', req.query);
    const { location, priceMax, priceMin, sizeMax, sizeMin, roomsNumber } = req.query;

    // var queryString = '\"' + query.split(' ').join('\" \"') + '\"';

    try {
      const apartmentsRecipe = await Apartment.find({ location: location  });
      res.status(200).json(apartmentsRecipe);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;