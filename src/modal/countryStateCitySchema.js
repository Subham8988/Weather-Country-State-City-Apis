const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoDb_Url, {
 
});

const countrySchema = new mongoose.Schema({
  country_name: {
    type: String,
    required: true
  },
  country_isoCode: {
    type: String,
    required: true
  },
  country_phonecode: {
    type: String,
    required: true
  },
  country_currency: {
    type: String,
    required: true
  }
});

const Country = mongoose.model('Countrie', countrySchema);
module.exports = Country;
