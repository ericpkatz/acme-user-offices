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
    Office.create({ name: 'midtown'}),
    Office.create({ name: 'downtown'}),
    Office.create({ name: 'upper west side'}),
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
