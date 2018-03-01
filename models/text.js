const db = require('../db.js');


exports.getAll = function () {
  return db.any('SELECT * FROM text');
};

exports.addText = function(text) {
  return db.one(`
    INSERT INTO text(name)
      VALUES ($1)
      RETURNING id
    `, [text.name]);
};

exports.deleteText = function(id) {
  if (!id) return 'ID REQUIRED';
  return db.one(`
    DELETE FROM text
    WHERE id = $1
    RETURNING id
    `, [id]);
};
