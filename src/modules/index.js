const notes = require('./notes/routes');

module.exports = async (app) => {
  app.use('/notes', notes);
};
