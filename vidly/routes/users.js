const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// router.post('/', async (req, res) => {
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
// });


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  

  // let genre = new Genre({ name: req.body.name });
  // genre = await genre.save();
  
  // res.send({
  //   name: user.name,
  //   email: user.email
  // });
  //const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  //res.send(_.pick(user, ['_id', 'name', 'email']))
});

module.exports = router;


// api/users