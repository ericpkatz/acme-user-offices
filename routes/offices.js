const app = require('express').Router();
const db = require('../db');
const { User, Office } = db.models;
module.exports = app;

app.get('/', (req, res, next)=> {
  Office.findAll({
    include: [ User ],
    order: ['name']
  })
    .then( offices => res.send(offices))
    .catch(next);
});


app.post('/', (req, res, next)=>{
  Office.create(req.body)
    .then( office => res.send(office))
    .catch(next);
});

app.delete('/:id', (req, res, next)=>{
  Office.destroy({
    where: { id: req.params.id }
  })
  .then( ()=> res.sendStatus(200))
  .catch(next);
});
