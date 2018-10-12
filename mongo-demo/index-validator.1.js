const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.err('Could not connect to MongoDB..', err));
 
const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
        //pattern//
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
                // Do some async work
                
            },
            message: 'A course should have atleast one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: v => Math.round(v);
        set: v => Math.round(v);
    }
});

const Course = mongoose.model('Course', courseSchema);


//Create new course
async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        category: '-',
        author: 'Ashok',
        tags: ['node', 'backend'],
        // tags: [],
        isPublished: true,
        price: 15
    });
    try {
        //await course.validate();
         const result = await course.save();
         console.log(result);
    } catch (ex){
        for (field in ex.errors){
            console.log(ex.errors[field]);
        }
    }

}

// const course = new Course({
//     name: 'Node.js Course',
//     author: 'Ashok',
//     tags: ['node', 'backend'],
//     isPublished: true
// });

// const result = await course.save();
// console.log(result);

// //Get Course
// async function getCourses() {
//     const courses = await Course.find();
//     console.log(courses);
// }

// getCourses();


// //Get course by author
// async function getCoursesByAuthor() {
//     const courses = await Course
//         .find({ author: 'Ashok', isPublished: true})
//         .limit(10)
//         .sort({ name: 1 }) // 1 for ascending -1 for descending.
//         .select({ name: 1, tags: 1});
//     console.log(courses);
// }

// getCoursesByAuthor();


////Get course by id
// async function getCoursesById() {

//     // eq (equal)
//     // ne (not equal)
//     // gt (greater than)
//     // gte (greater than or equal to)
//     // lt (less than)
//     // lte (less than or equal to)
//     // in
//     // nin (not in)
    
//     const courses = await Course
//         .find({ price: { $gt: 10 }})
//         .find ({ price: { $in: [10, 15, 20] } })
//         .limit(10)
//         .sort({ name: 1 }) // 1 for ascending -1 for descending.
//         .select({ name: 1, tags: 1});
//     console.log(courses);
// }

// getCoursesById();

////LOGICAL OPERATORS
//Get course by author
// async function getCourses() {
//     const courses = await Course
//         .find()
//         .or([ { author: 'Ashok' }, { isPublished: true }])
//         .and([ ])
//         .limit(10)
//         .sort({ name: 1 }) // 1 for ascending -1 for descending.
//         .select({ name: 1, tags: 1});
//     console.log(courses);
// }

// getCourses;


//Regular expressions
// async function getCourses() {
//     const courses = await Course
//         .find({ author: /^Ashok/ }) //Starts with Ashok
//         //Ends with Tulachan
//         .find({ author: /Tulachan$/i })

//         //contains ashok
//         .find({ author: /.*Ashok.*/i })
//         .limit(10)
//         .sort({ name: 1 }) // 1 for ascending -1 for descending.
//         .select({ name: 1, tags: 1});
//     console.log(courses);
// }

// getCourses;

// // //Get Count
// async function getCourses() {
//     const courses = await Course
//         .find({ author: 'Ashok', isPublished: true})
//         .limit(10)
//         .sort({ name: 1})
//         .count();
//     console.log(courses);
// }

// getCourses();


//Pagination

// // //Get Count
// async function getCourses() {
//     const pageNumber = 2;
//     const pageSize = 10;
//     // /api/courses/?pageNumber=2&pageSize=10
//     const courses = await Course
//         .find({ author: 'Ashok', isPublished: true})
//         .skip((pageNumber - 1)* pageSize)
//         .limit(pageSize)
//         .limit(10)
//         .sort({ name: 1})
//         .count();
//     console.log(courses);
// }

// getCourses();

// //UPDATE COURSE
// async function updateCourse(id) {
//     //Approach: Query first
//     // findById()
//     //Modify its properties
//     //save()
//     const course = await Course.findById(id);
//     if (!course) return;
//     course.isPublished = true;
//     course.author = 'Another Author';
//     // course.set({
//     //     isPublished: true,
//     //     author: 'Another Author'
//     // });

//     const result = await course.save();
//     console.log(result);

// }

// updateCourse('5bbd7d6947808327d4cdc710');


// //UPDATE COURSE
// async function updateCourse(id) {

//     //Approach: Update first
//     //Update Directly
//     //optionally get the updated document
//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: 'Jack',
//             isPublished: true
//         }
//     }, { new: true });
//     console.log(course);


// }

// updateCourse('5bbd7d6947808327d4cdc710');


//REMOVE DOCUMENT
// async function removeCourse(id) {
//     const result = await Course.deleteOne({ _id: id })
//     console.log(result);
// }

// removeCourse('5bbd7d6947808327d4cdc710');


// //REMOVE MANY DOCUMENT
// async function removeCourse(id) {
//     const result = await Course.deleteMany({ _id: id })
//     console.log(result);
// }

// removeCourse('5bbd7d6947808327d4cdc710');

//REMOVE DOCUMENT
// async function removeCourse(id) {
//     const course = await Course.findByIdAndRemove(id);
//     console.log(course);
// }

// removeCourse('5bbd7d6947808327d4cdc710');

createCourse();