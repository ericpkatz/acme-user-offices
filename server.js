const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const { User, Office } = db.models;
const pug = require('pug');

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/source', express.static(path.join(__dirname, 'source')));
app.use(require('body-parser').urlencoded({ extended: false}));

app.set('view engine', 'html');
app.engine('html', pug.renderFile);

let config = process.env;
try{
  config = require('./env.json');
}
catch(ex){
}

app.use((req, res, next)=> {
  res.locals.GOOGLE_API_KEY = config.GOOGLE_API_KEY;
  next();
});

app.get('/', (req, res, next)=> {
  res.render('index');
});

app.use('/users', require('./routes/users'));
app.use('/offices', require('./routes/offices'));

const port = process.env.PORT || 3000;

db.sync()
  .then(db.seed)
  .then( ()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(ex => console.log(ex));
