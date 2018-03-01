// module to connect to PostgreSQL DB.
const pgp = require('pg-promise')();
const connectionStr = 'postgres://localhost:5432/text_annotator'
const db = pgp(connectionStr);

module.exports = db;
