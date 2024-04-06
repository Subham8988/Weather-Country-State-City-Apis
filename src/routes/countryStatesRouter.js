const router = require('express').Router();
const controller =require('../controller/countryStatesApiController/countryStates');

router.get('/getAllCountryList',controller.countriesList);
router.get('/getCity',controller.cityList);
router.get('/getStates',controller.stateList);

module.exports=router

