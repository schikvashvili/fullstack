const express = require('express');
const contoller = require('../controllers/position');
const router = express.Router();

router.get('/:categoryId', contoller.getByCategoryId);
router.post('/', contoller.create);
router.delete('/:id', contoller.remove);
router.patch('/:id', contoller.update);

module.exports = router;