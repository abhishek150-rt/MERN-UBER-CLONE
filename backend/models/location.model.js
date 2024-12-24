const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  lat: String,
  lng: String,
  name: String,
});

const locationModal = model("Location", locationSchema);
module.exports = locationModal;
