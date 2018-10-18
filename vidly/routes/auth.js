const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// router.post('/', async (req, res) => {
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
// });

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;


// api/users