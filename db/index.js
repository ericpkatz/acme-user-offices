const conn = require('./conn');

const Office = require('./office');
const User = require('./user');

User.belongsTo(Office);
Office.hasMany(User);

const sync = ()=> {
  return conn.sync({ force: true });
};

const seed = ()=> {
  return Promise.all([
    User.create({ name: 'moe'}),
    User.create({ name: 'larry'}),
    User.create({ name: 'curly'}),
    Office.create({ name: '2 Times Square, New York, NY 10036, USA', lat: 40.7594456, lng: -73.9847779}),
    Office.create({ name: '5 Hanover Square, Floor 25, New York, NY 10004, USA', lat: 40.705076, lng: -74.00916 }),
    Office.create({ name: '665 Amsterdam Ave, New York, NY 10025, USA', lat: 40.791792, lng:  -73.971755}),
  ])
  .then(([ moe, larry, curly, midtown, downtown, uws])=> {
    return moe.setOffice(midtown);
  });
};

module.exports = {
  sync,
  seed,
  models: {
    User,
    Office
  }
};
