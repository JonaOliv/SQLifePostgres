'use strict';

const Student = require('../models').Student;

module.exports = {
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
