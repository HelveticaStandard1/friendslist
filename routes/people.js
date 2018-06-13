var express = require('express');
var router = express.Router();
var Person = require('../models/person.js');

/* GET ALL People */
router.get('/people/list/:type', function (req, res, next) {
  Person.find({type: req.params.type}, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/people', function (req, res, next) {
  Person.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PERSON BY ID */
router.get('/people/:id', function (req, res, next) {
  Person.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PERSON */
router.post('/people', function (req, res, next) {
  Person.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PERSON */
router.put('/people/:id', function (req, res, next) {
  Person.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PERSON */
router.delete('/people/:id', function (req, res, next) {
  Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
