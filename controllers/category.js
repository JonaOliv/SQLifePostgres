'use strict';

const Category = require('../models').Category;

module.exports = {
  list(req, res) {
    return Category
      .findAll({})
      .then((Categories) => res.status(200).send(Categories))
      .catch((error) => { res.status(400).send(error); });
  },
  getById(req, res) {
    return Category
      .findByPk(req.params.id, {})
      .then((Category) => {
        if (!Category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return res.status(200).send(Category);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Category
      .create({
        name: req.body.name
      })
      .then((Category) => res.status(201).send(Category))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Category
      .findByPk(req.params.id, {})
      .then(Category => {
        if (!Category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return Category
          .update({
            name: req.body.name || Category.name,
          })
          .then(() => res.status(200).send(Category))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  delete(req, res) {
    return Category
      .findByPk(req.params.id)
      .then(Category => {
        if (!Category) {
          return res.status(400).send({
            message: 'Category Not Found',
          });
        }
        return Category
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
