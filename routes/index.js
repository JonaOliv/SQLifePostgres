var express = require('express');
var router = express.Router();

const course = require('../controllers').course;
const student = require('../controllers').student;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Courses' });
});

router.get('/courses', course.list);

router.get('/students/', student.list);

router.get('/student/:student_id', student.getById);

router.get('/student/:student_id/courses', {});

router.get('/student/:student_id/courses/:course_id', {});

router.get('/course/:course_id', course.getById);

router.get('/course/:course_id/schedules', {});

module.exports = router;
