const conn = require('./conn');

const Office = conn.define('office', {
  name: conn.Sequelize.STRING,
  address: conn.Sequelize.STRING,
  lat: conn.Sequelize.FLOAT,
  lng: conn.Sequelize.FLOAT
});

module.exports = Office;
