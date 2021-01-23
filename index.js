const express = require('express');
const Cors = require('cors');
const bodyParser = require('body-parser');
const contact = require('./routes/contact.js');
const { allowed_url } = require('./config/config.js');
const db = require('./db/index.js');
const app = express();

app.use(
	Cors({
		origin: allowed_url
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

db.connect();

app.use('/api/contact',contact)
app.listen(port, () => console.log(`Listening to requests on port: ${port}`));

module.exports = app;