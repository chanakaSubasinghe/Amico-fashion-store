// condition
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}


// requiring npm modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')

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

/// passport configuration
app.use(require('express-session')({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())


// importing routes
const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')
const storeManager = require('./routes/storeManager')
const itemCategoryRoute = require('./routes/itemCategory')
const itemRoute = require('./routes/item')
const cartRoute = require('./routes/cart')


// invoking routes
app.use(adminRoute)
app.use(userRoute)
app.use(storeManager)
app.use(itemCategoryRoute)
app.use(itemRoute)
app.use(cartRoute)



app.listen(PORT, () => {
	console.log(`Server is running on ` + PORT);
});
