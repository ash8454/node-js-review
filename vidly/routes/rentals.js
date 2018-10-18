const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const auth = require('../middleware/auth');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await movie.find().sort('-dateOut');
    res.send(rentals);
  });
  
  router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock == 0) return res.status(400).send('Movie not in stock');

    let rental= new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        name: movie.title,
        dailyRentalRate: req.body.dailyRentalRate
      }
    });
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();

    //Replacement using fawn
    try {
      new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, {
        $inc: { numberInStock: -1 }
      })
      .run();
    res.send(rental);
    } 
    catch(ex){
      res.status(500).send("Something failed.");
    }
  });


  
  router.get('/:id', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);

    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  

  module.exports = router;