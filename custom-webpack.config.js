const jsonServer = require('json-server')

module.exports = {
  devServer: {
    before(app) {
      app.use('/api', jsonServer.router('db.json'));
    }
  }
}
