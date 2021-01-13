var express = require("express");
var router = express.Router();
// var mongoose = require('mongoose');
var Ministry = require("../models/index");

/* GET ALL */
router.get("/", function getAll(req, res, next) {
  //get all items
  Ministry.find()
    .then((data) => res.json({
      ministries: data,
      message: "Get all Data success"
    }))
    .catch((err) => next(err));
});

/* GET BY ID */
router.get("/ministry/:id", function getById(req, res, next) {
  //get item by id
  Ministry.findById(req.params.id)
    .then((data) => (data ? res.json({
        ministries: data,
    })
: res.sendStatus(404)))
    .catch((err) => next(err));
});

/* SAVE */
router.post("/ministry", function add(req, res, next) {
  //create new item
  Ministry.create(req.body)
    .then(() =>
      res.status(200).send({
        message: "Saved successfully",
      })
    )
    .catch((err) => next(err));
});

/* UPDATE */
router.put("/ministry/:id", function update(req, res, next) {
  const data =  req.body
  if (req.body) {
    for (const element in data) {
      if (!data[element]) {
        delete data[element];
      }
    }
  }
  console.log('Data',data)
  //update item
  Ministry.findByIdAndUpdate(req.params.id, data)
    .then(() =>
    res.status(200).send({
        message: "Saved successfully",
      })
    )
    .catch((err) => next(err));
});

/* DELETE  */
router.delete("/ministry/:id", function _delete(req, res, next) {
  //delete item
  Ministry.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).send({
        message: "delete successfully",
      })
    )
    .catch((err) => next(err));
});

module.exports = router;
