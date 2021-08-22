'use strict';

const Course = require('../models').Course;

module.exports = {
  list(req, res) {
    return Course
      .findAll({})
      .then((Courses) => res.status(200).send(Courses))
      .catch((error) => { res.status(400).send(error); });
  },
  getById(req, res) {
    return Course
      .findByPk(req.params.id, {})
      .then((Course) => {
        if (!Course) {
          return res.status(404).send({
            message: 'Course Not Found',
          });
        }
        return res.status(200).send(Course);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Course
      .create({
        name: req.body.name
      })
      .then((Course) => res.status(201).send(Course))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Course
      .findByPk(req.params.id, {})
      .then(Course => {
        if (!Course) {
          return res.status(404).send({
            message: 'Course Not Found',
          });
        }
        return Course
          .update({
            name: req.body.name || Course.name,
          })
          .then(() => res.status(200).send(Course))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return Course
      .findByPk(req.params.id)
      .then(Course => {
        if (!Course) {
          return res.status(400).send({
            message: 'Course Not Found',
          });
        }
        return Course
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
