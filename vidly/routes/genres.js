const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const admin = require('../middleware/admin');
const router = express.Router();
const { Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
// const asyncMiddleware = require('../middleware/async');



// const genres = [
//     { id: 1, name: 'Action' },
//     { id: 2, name: 'Horror' },
//     { id: 3, name: 'Romance' }
// ];


// router.get('/', (req, res) => {
//     // res.send([1, 2, 3]);
//     res.send(genres);
// });

// // //post
// router.post('/', (req, res) => {
//     const { error } = validate(req.body); //result.error
//     if (error) return res.status(400).send(result.error.details[0].message);

//     const genre = {
//         id: genres.length + 1,
//         name: req.body.name
//     };
//     genres.push(genre);
//     res.send(genre);
// });



// router.get('/:id', async (req, res) => {
//    const genre = await Genre.findById(req.params.id);
//    if (!genre) return res.status(404).send('The genre with the given ID was not found');
//    res.send(genre);
// });

// router.put('/:id', (req, res) => {
    
//     //Look up the genre
//     // If not existing, return 404
//     const genre = genres.find(c => c.id === parseInt(req.params.id));
//     //if (!genre) res.status(404).send('The genre with the given ID was not found');
//     if (!genre) return res.status(404).send('The genre with the given ID was not found');

//     //Validate
//     //if invalid, return 400 - Bad request
//     //const result = validate(req.body);
//     const { error } = validate(req.body); //result.error
//     if (error) return res.status(400).send(result.error.details[0].message);


//     //Update genre
//     genre.name = req.body.name;
//     //Return the updated genre
//     res.send(genre);
// });


// function validate(genre){
//     const schema = {
//         name: Joi.string().min(3).required()
//     }
//     return Joi.validate(genre, schema);
// }

// router.delete('/:id', (req, res) => {
//     //Look up the genre
//     //Not existing, return 404
//     const genre = genres.find(c => c.id === parseInt(req.params.id));
//     if (!genre) res.status(404).send('The genre with the given ID was not found');

//     //Delete
//     const index = genres.indexOf(genre);
//     genres.splice(index, 1);

//     res.send(genre);

//     //Return the same genre
// });




// router.get('/', async (req, res, next) => {
//   try {
//       const genres = await Genre.find().sort('name');
//       res.send(genres);
//     } catch (ex){
//       // Log the exception
//       // res.status(500).send('Something failed.');
//       next(ex);
//     }
//   });

  router.get('/', async (req, res) => {
    //throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
  });
  
  router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    
    res.send(genre);
  });
  
  router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
  });
  
  router.delete('/:id', [auth, admin],async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  
  router.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  


module.exports = router;