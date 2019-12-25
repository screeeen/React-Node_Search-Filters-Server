const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  name:String,
  price:Number,
  sqm:Number,
  numberOfBedrooms:Number,
  numberOfBadrooms:Number,
})

const Apartment = mongoose.model('Apartment',apartmentSchema);

module.exports = Apartment;