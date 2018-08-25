const multer = require('multer')
const Text = require('../models/text.js');
const convertFileToHTML = require('../utils/convert_file_to_html');
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
  // res.render('base', {view: 'text/upload'});

  'use strict';
  const bucketName = 'text-annotator';

  function listFiles(bucketName) {
    // [START storage_list_files]
    // Imports the Google Cloud client library
    const Storage = require('@google-cloud/storage');
    console.log(Storage);
// Your Google Cloud Platform project ID
const projectId = 'savvy-music-213820';

// Creates a client
const storage = new Storage({
  projectId: projectId,
});

// The name for the new bucket
    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const bucketName = 'Name of a bucket, e.g. my-bucket';
  
    // Lists files in the bucket
    storage
      .bucket(bucketName)
      .getFiles()
      .then(results => {
        const files = results[0];
  
        console.log('Files:');
        files.forEach(file => {
          console.log(file.name);
        });
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    // [END storage_list_files]
  }

  listFiles(bucketName);

  res.render('base', {view: 'text/test'});

}

exports.upload = function(req, res) {
  const mUpload = multer({dest: `texts/temp/`}).single('textFile');

  mUpload(req, res, function(err) {
    if (err) res.send(err);
    const textFilePath = req.file.path;
    const textForDb = {
      name: req.body.name,
    };
    Text.addText(textForDb)
      .then((textEntry) => {
        mkdirp.sync(`texts/${textEntry.id}`);
        const newPath = `texts/${textEntry.id}/${textEntry.id}.ejs`;
        convertFileToHTML(textFilePath, newPath);
        fs.unlinkSync(textFilePath);
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
};



exports.view = function(req, res) {
  res.render('base', {view: 'text/view', textId: req.params.id});
}

// exports.create = function(req, res) {
//   res.send('create');
// }
//
// exports.new = function(req, res) {
//   res.send('new');
// }
//
// exports.view = function(req, res) {
//   res.send('view');
// }
//
// exports.update = function(req, res) {
//   res.send('update');
// }
//
// exports.delete = function(req, res) {
//   res.send('delete');
// }
