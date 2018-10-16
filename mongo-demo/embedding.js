const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result); 
}
async function addAuthor(courseId, author) { 
    const course = await Course.findById(couurseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, author) { 
    const course = await Course.findById(couurseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
addAuthor('5bc5520408e7c5f85d1ffd11', new Author({ name: 'Ashok Tulachan'}));