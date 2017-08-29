const app = require('express').Router();
const db = require('../db');
const { User, Office } = db.models;
module.exports = app;

app.get('/', (req, res, next)=> {
  User.findAll({
    order: [ 'name' ],
    include: [ Office ]
  })
    .then( users => res.send(users))
    .catch(next);
});

app.put('/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then((user) => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user=> res.send(user))
    .catch(next);
});

app.delete('/users/:id', (req, res, next)=>{
  User.destroy({
    where: { id: req.params.id }
  })
  .then( ()=> res.sendStatus(200))
  .catch(next);
});

app.post('/', (req, res, next)=>{
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});
