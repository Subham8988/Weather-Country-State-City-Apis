const axios = require('axios');
const errorHandler = require('../../exception-error-handler/errorExceptionHandler')

const weatherReports = async (req, res) => {
    try {
        if (!req.query.city_name) {
            res.status(400).send({ status: 400, message: 'city name missing' });
            return;
        }
        let url = `${process.env.Weather_Url}${req.query.city_name}&appid=${process.env.aap_id}`;
        const response = await axios.get(url);
        if (response.status === 200) {
            res.status(200).send({ status: 200, data: response.data });
        } else {
            errorHandler(res, req.originalUrl, response.status, 'City not found');
        }
    } catch (error) {
        errorHandler(res, req.originalUrl, 500, error.message);
    }
}


module.exports = { weatherReports }