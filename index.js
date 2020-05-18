// condition
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// requiring npm modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
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
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connected!");
});

/// passport configuration
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// importing routes
const userRoute = require("./routes/user");
const itemCategoryRoute = require("./routes/itemCategory");
const itemRoute = require("./routes/item");
const rateRoute = require("./routes/rate");
const cartRoute = require("./routes/cart");
const commentRoute = require('./routes/comment')

// invoking routes
app.use(userRoute);
app.use(itemCategoryRoute);
app.use(itemRoute);
app.use(cartRoute);
app.use(rateRoute);
app.use(cartRoute);

app.use(commentRoute)

// if (process.env.NODE_ENV.trim() === "production") {
//   app.use(express.static("client/build"));
// }
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on ` + PORT);
});
