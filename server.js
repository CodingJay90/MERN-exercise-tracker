const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const path = require('path')

// require("dotenv/types").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

if(process.env.NODE_ENV === 'production') {
  app.use(express.static("./Exercise-tracker/build"))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './Exercise-tracker', 'build', 'index.html'))
  })
}

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/exercise_tracker", { useNewUrlParser: true })
  .then(console.log("database connected successfully"));

const exerciseRouter = require('./backend/routes/exercises')
const usersRouter = require('./backend/routes/users')

app.use('/exercises', exerciseRouter)
app.use('/users', usersRouter)

app.listen(port, () => console.log(`server running on port: ${port}`));
