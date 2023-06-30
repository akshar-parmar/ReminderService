const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    EMAIL_PASSWORD : process.env.EMAIL_PASSWORD,
    EMAIL_ID: process.env.EMAIL_ID
}