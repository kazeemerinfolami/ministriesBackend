var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require('cors')
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var logger = require("morgan");

var ministries = require('./routes/index')

var app = express();

//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
mongoose
  .connect(
    
    "mongodb+srv://sa:user12345678@cluster0-eba0o.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(err.message);
  });

  
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json())
app.use(cors())
if ((process.env.NODE_ENV = 'development')) {
    app.use(cors({ origin: process.env.CLIENT_URL }))
}

app.use('/api/v1', ministries)

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`running on port ${port}`);
})

module.exports = app;
