const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose')
const cors = require('cors')
const provinces = require('./provincias.json')
const database = require('./data_final.json')
/* User */
const userRoutes = require('./routes/User')
/* Location */
const provincesRoutes = require('./routes/Provinces')
const regionsRoutes = require('./routes/Regions')
const citiesRoutes = require('./routes/Cities')
/* Listings */
const listingRoutes = require('./routes/Listings')
const listingsInfo = require('./routes/ListingsInfo')
/* Search Engine */
const searchEngineRoutes = require('./routes/SeachEngine')
/* Maps */
const mapsRoutes = require('./routes/Maps')
/* Messages */
const messageRoutes = require('./routes/Messages')

require("dotenv").config()

var Schema = mongoose.Schema;
app.use(cors())
app.use(express.json())


app.use("/api/user", userRoutes)

app.use("/api/provinces", provincesRoutes)
app.use("/api/regions", regionsRoutes)
app.use("/api/cities", citiesRoutes)

app.use("/api/listings", listingRoutes)
app.use("/api/listings-info", listingsInfo)
app.use("/api/engine", searchEngineRoutes)
app.use("/api/maps", mapsRoutes)

app.use("/api/messages", messageRoutes)

var uri = process.env.MONGO_URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});



app.listen(
    PORT,
    () => console.log(`it's alive on port ${PORT}`)
)