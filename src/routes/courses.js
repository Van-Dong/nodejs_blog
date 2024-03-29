const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit)
router.patch('/:id/restore', courseController.restore);
router.post('/handle-form-action', courseController.handleFormAction)
router.put('/:id', courseController.update)
router.delete('/:id/force', courseController.forceDelete)
router.delete('/:id', courseController.delete)
router.get('/:slug', courseController.show);
router.get('/', courseController.index)

module.exports = router;
