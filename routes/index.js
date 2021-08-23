var express = require('express');
var router = express.Router();

const course = require('../controllers').course;
const student = require('../controllers').student;
const category = require('../controllers').category;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Courses' });
});

router.get('/courses', course.list);

router.get('/students/', student.list);

router.get('/student/:student_id', student.getById);

router.get('/student/:student_id/courses', student.getCourses);

router.get('/student/:student_id/courses/:course_id', student.getCourse);

router.get('/course/:course_id', course.getById);

router.post('/course', course.add);

router.post('/student', student.add);

router.post('/category', category.add);

router.post('/student/:student_id/schedules/', student.addSchedules);

module.exports = router;
