const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
    // res.send([1, 2, 3]);
    res.send(courses);
});


// /api/courses/1
// router.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

// router.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// });


//post
router.post('/', (req, res) => {

    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    // const result = Joi.validate(req.body, schema);
    // console.log(result);
    
    // if (!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return;
    // }
    // if (result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    const { error } = validateCourse(req.body); //result.error
    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.get('/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (!course) return res.status(404).send('The course with the given ID was not found');
   res.send(course);
});

router.put('/:id', (req, res) => {
    //Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //if (!course) res.status(404).send('The course with the given ID was not found');
    if (!course) return res.status(404).send('The course with the given ID was not found');

    //Validate
    //if invalid, return 400 - Bad request
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); //result.error
    if (error) return res.status(400).send(result.error.details[0].message);


    //Update course
    course.name = req.body.name;
    //Return the updated course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

router.delete('/:id', (req, res) => {
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

    //Return the same course
});

module.exports = router;