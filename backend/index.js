// condition
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}


// requiring npm modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('database connected!');
});

/// passport configuration
app.use(require('express-session')({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))


// importing routes
const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')
const storeManager = require('./routes/storeManager')
const itemCategoryRoute = require('./routes/itemCategory')
const itemRoute = require('./routes/item')


// invoking routes
app.use(adminRoute)
app.use(userRoute)
app.use(storeManager)
app.use(itemCategoryRoute)
app.use(itemRoute)



app.listen(PORT, () => {
	console.log(`Server is running on ` + PORT);
});
