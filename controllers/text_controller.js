const multer = require('multer')
const Text = require('../models/text.js');
const convertFileToHTML = require('../utils/convert_file_to_html');
const convertTextToHTML = require('../utils/convert_file_to_html');

// Like the terminal command `mkdir -p`, mkdirp creates a directory and any
// subdirectories if directory doesn't exist.
const mkdirp = require('mkdirp');
const fs = require('fs');

exports.index = function(req, res) {
  Text.getAll()
    .then((data) => {
      console.log(data);
      res.render('base', {view: 'text/index', texts: data});
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}

exports.upload_view = function(req, res) {
  res.render('base', {view: 'text/upload'});

}

exports.uploadFile = function(req, res) {
  const mUpload = multer({dest: `texts/temp/`}).single('textFile');
  
  mUpload(req, res, function(err) {
    if (err) res.send(err);
    const textFilePath = req.file.path;
    const textForDb = {
      name: req.body.name,
    };
    const lang = req.body.lang;
    console.log(lang);
    Text.addText(textForDb)
      .then((textEntry) => {
        mkdirp.sync(`texts/${textEntry.id}`);
        const newPath = `texts/${textEntry.id}/${textEntry.id}.ejs`;
        const text = fs.readFileSync(textFilePath, 'utf-8');
        convertTextToHTML(text, newPath, lang);
        // convertFileToHTML(textFilePath, newPath);
        fs.unlinkSync(textFilePath);
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
};

exports.uploadText = function(req, res) {
  const textForDb = {
    name: req.body.name,
  };
  const text = req.body.text;
  const lang = req.body.lang;
  console.log(lang);
  Text.addText(textForDb)
    .then((textEntry) => {
      mkdirp.sync(`texts/${textEntry.id}`);
      const newPath = `texts/${textEntry.id}/${textEntry.id}.ejs`;
      convertTextToHTML(text, newPath, lang);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  
};

exports.view = function(req, res) {
  res.render('base', {view: 'text/view', textId: req.params.id});
}

exports.delete = function(req, res) {
  const textId = req.params.id;
  Text.deleteText(textId)
    .then((textEntry) => {
      const textFilePath = `texts/${textId}/${textId}.ejs`;
      fs.unlinkSync(textFilePath);
      res.end();
    })
}
