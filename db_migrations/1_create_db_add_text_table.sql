DROP DATABASE IF EXISTS text_annotator;
CREATE DATABASE text_annotator;

\c text_annotator;

CREATE TABLE text (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

INSERT INTO text (name)
  VALUES ('Les Mis Test');
