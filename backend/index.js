// requiring npm modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// assigning PORT number
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// database URL
const databaseURL = process.env.ATLAS_URI;

//database connection
mongoose.connect(databaseURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('database connected!');
});

// importing routes
const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')
const storeManager = require('./routes/storeManager')

// invoking routes
app.use(adminRoute)
app.use(userRoute)
app.use(storeManager)


app.listen(PORT, () => {
	console.log(`Server is running on ` + PORT);
});