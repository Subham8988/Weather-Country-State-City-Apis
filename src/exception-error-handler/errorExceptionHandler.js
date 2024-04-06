const fs = require('fs').promises;
async function errorHandler(res, endPoint, status, message) {
    const date = new Date().toISOString();

    const logContent = `Date = ${date}, EndPoint = ${endPoint}, ErrorMsg = ${message}\n`;

    try {
        await fs.appendFile('error_log.txt', logContent);
        res.status(status).send({
            status: status,
            error: message
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Internal Server Error'
        });
    }
}

module.exports = errorHandler;
