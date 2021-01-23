require('dotenv').config();

module.exports = {
	DB: process.env.DB,
	allowed_url: process.env.REACT_APP_URL,
};