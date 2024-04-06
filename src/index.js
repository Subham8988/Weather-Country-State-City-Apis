const express = require('express');
const app =express();
const weatherRouts= require('./routes/weatherReportsRouter');
const countryRouts= require('./routes/countryStatesRouter');

//static base url for api weather reports
app.use('/api/v1/',weatherRouts);
app.use('/api/v1/',countryRouts);




module.exports = app;

