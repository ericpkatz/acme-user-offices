const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const { User, Office } = db.models;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/source', express.static(path.join(__dirname, 'source')));
app.use(require('body-parser').urlencoded({ extended: false}));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/users', (req, res, next)=> {
  User.findAll({
    order: [ 'name' ],
    include: [ Office ]
  })
    .then( users => res.send(users))
    .catch(next);
});

app.put('/users/:id', (req, res, next)=> {
  User.findById(req.params.id)
    .then((user) => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then( user=> res.send(user))
    .catch(next);
});

app.get('/offices', (req, res, next)=> {
  Office.findAll({
    include: [ User ],
    order: ['name']
  })
    .then( offices => res.send(offices))
    .catch(next);
});

app.post('/users', (req, res, next)=>{
  User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

app.post('/offices', (req, res, next)=>{
  Office.create(req.body)
    .then( office => res.send(office))
    .catch(next);
});

app.delete('/offices/:id', (req, res, next)=>{
  Office.destroy({
    where: { id: req.params.id }
  })
  .then( ()=> res.sendStatus(200))
  .catch(next);
});

app.delete('/users/:id', (req, res, next)=>{
  User.destroy({
    where: { id: req.params.id }
  })
  .then( ()=> res.sendStatus(200))
  .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
  .then(db.seed)
  .then( ()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(ex => console.log(ex));
