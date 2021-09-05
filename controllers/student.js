'use strict';

const Student = require('../models').Student;
const Schedule = require('../models').Schedule;
const Course = require('../models').Course;

module.exports = {
  getCourses(req, res){
    Schedule
      .findAll({
        where: {
          student_id: req.params.student_id
        },
        include: {
          model: Course,
          required: true
        }
      })
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            message: 'Courses Not Found',
          });
        }
        return res.status(200).send(results);
      })
      .catch((error) => res.status(400).send(error));
  },
  getCourse(req, res){
    return Schedule
      .findOne({
        where: {
          course_id: req.params.course_id,
          student_id: req.params.student_id
        },
        include: {
          model: Course,
          required: true
        }
      })
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            message: 'Course Not Found',
          });
        }
        return res.status(200).send(results);
      })
      .catch((error) => res.status(400).send(error));
  },
  addSchedules(req, res){
    var listInterests = req.body.listInterests;
    return Schedule.bulkCreate(listInterests, { updateOnDuplicate: ['description', 'update_at'] })
      .then((schedules) => res.status(201).send(schedules))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Student
      .findAll({})
      .then((Students) => res.status(200).send(Students))
      .catch((error) => { res.status(400).send(error); });
  },
  getById(req, res) {
    return Student
      .findByPk(req.params.id, {})
      .then((Student) => {
        if (!Student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return res.status(200).send(Student);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Student
      .create({
        name: req.body.name
      })
      .then((Student) => res.status(201).send(Student))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Student
      .findByPk(req.params.id, {})
      .then(Student => {
        if (!Student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return Student
          .update({
            name: req.body.name || Student.name,
          })
          .then(() => res.status(200).send(Student))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return Student
      .findByPk(req.params.id)
      .then(Student => {
        if (!Student) {
          return res.status(400).send({
            message: 'Student Not Found',
          });
        }
        return Student
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
