const express = require('express');
const contoller = require('../controllers/category');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), contoller.getAll);
router.get('/:id', contoller.getById);
router.delete('/:id', contoller.remove);
router.post('/', contoller.create);
router.patch('/:id', contoller.update);

module.exports = router;