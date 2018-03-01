var express = require('express');
var router = express.Router();
const text_controller = require('../controllers/text_controller');

router.get('/', text_controller.index);
router.get('/upload', text_controller.upload_view);
router.post('/upload', text_controller.upload);

router.get('/:id', text_controller.view)
// router.post('/', text_controller.create);
// router.get('/new', text_controller.new);
// router.get('/:id', text_controller.view);
// router.post('/:id', text_controller.update);
// router.post('/:id/delete', text_controller.delete);

module.exports = router;
