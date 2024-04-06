const router = require('express').Router();
const weatherReportsController = require('../controller/weatherApiController/weather-reports');

//routes to controller
router.get('/getWeatherReports', weatherReportsController.weatherReports);


module.exports=router
