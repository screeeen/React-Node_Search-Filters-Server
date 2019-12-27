const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  name:String,
  city:String,
  longitude:Number,
  latitude:Number,
  price:Number,
  sqm:Number,
  numberOfBedrooms:Number,
  numberOfBathrooms:Number,
})

const Apartment = mongoose.model('Apartment',apartmentSchema);

module.exports = Apartment;