var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;
var ministry = new Schema(
  {
    name: { type: String },
    minister: { type: String },
    origin: { type: String },
    address: { type: String },
    website: { type: String }
  },
  { timestamps: true }
);

//Export function to create "SomeModel" model class
module.exports = mongoose.model("ministry", ministry);
