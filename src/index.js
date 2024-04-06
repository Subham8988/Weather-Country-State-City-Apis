const express = require('express');
const app =express();
const weatherRouts= require('./routes/weatherReportsRouter')

//static base url for api weather reports
app.use('/api/v1/',weatherRouts)




module.exports = app;

