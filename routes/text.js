var express = require('express');
var router = express.Router();
const text_controller = require('../controllers/text_controller');

router.get('/', text_controller.index);
router.get('/upload', text_controller.upload_view);
router.post('/upload-file', text_controller.uploadFile);
router.post('/upload-text', text_controller.uploadText);

router.get('/:id', text_controller.view)
router.delete('/:id', text_controller.delete);

module.exports = router;
