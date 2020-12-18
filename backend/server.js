const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

if(process.env.NODE_ENV === 'production') {
  app.use(express.static("../Exercise-tracker/build"))
}

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/exercise_tracker", { useNewUrlParser: true })
  .then(console.log("database connected successfully"));

const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exerciseRouter)
app.use('/users', usersRouter)

app.listen(port, () => console.log(`server running on port: ${port}`));
