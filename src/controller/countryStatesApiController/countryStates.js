const { MongoClient } = require("mongodb");
const errorHandling = require('../../exception-error-handler/errorExceptionHandler');
const connectToDatabase = async () => {
    const client = await MongoClient.connect(process.env.mongoDb_Url);
    return client;
};

const countriesList = async (req, res) => {
    try {
        const client = await connectToDatabase();
        const dbo = client.db("CountriesStatesCity");
        const collection = dbo.collection("Countries");
        const filter = {};
        if (req.query.country_name) {
            filter.country_name = { $regex: req.query.country_name, $options: "i" };
        }
        if (req.query.country_isoCode) {
            filter.country_isoCode = { $regex: req.query.country_isoCode, $options: "i" };
        }
        if (req.query.country_phonecode) {
            filter.country_phonecode = { $regex: req.query.country_phonecode, $options: "i" };
        }
        if (req.query.country_currency) {
            filter.country_currency = { $regex: req.query.country_currency, $options: "i" };
        }

        const cursor = collection.find(filter);
        const result = await cursor.toArray();

        await client.close();

        if (result.length > 0) {
            res.status(200).json({
                status: 200,
                length: result.length,
                data: result,
            });
        } else {
            res.status(404).send({ msg: 'Countries not found' });
        }
    } catch (error) {
        errorHandling(res, req.originalUrl, 500, error.message);
    }
};


const stateList = async (req, res) => {
    try {
        const client = await connectToDatabase();
        const dbo = client.db("CountriesStatesCity");
        const collection = dbo.collection("States");
        const filter = req.query;
        const cursor = collection.find(filter);
        const result = await cursor.toArray();
        await client.close();
        if (result.length > 0) {
            res.status(200).json({
                status: 200,
                length: result.length,
                data: result,
            });
        } else {
            res.status(404).send({ msg: 'States not found' });
        }
    } catch (error) {
        errorHandling(res, req.originalUrl, 500, error.message);
    }
};

const cityList = async (req, res) => {
    try {
        const client = await connectToDatabase();
        const dbo = client.db("CountriesStatesCity");
        const collection = dbo.collection("Cityies");

        const filter = req.query || {};
        const count = await collection.countDocuments(filter);

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;

        const cursor = collection.find(filter);
        // const result = await cursor.skip(skip).limit(limit).toArray();
        const result = await cursor.toArray();

        await client.close();

        if (result.length > 0) {
            res.status(200).json({
                status: 200,
                length: result.length,
                data: result,
                page: page,
                totalPages: totalPages,
            });
        } else {
            res.status(404).send({ msg: 'Cities not found' });
        }
    } catch (error) {
        errorHandling(res, req.originalUrl, 500, error.message);
    }
};


module.exports = { countriesList, stateList, cityList };
