const express = require('express');
const passport = require('passport');
const contoller = require('../controllers/position');
const router = express.Router();

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), contoller.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), contoller.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), contoller.remove);
router.patch('/:id', passport.authenticate('jwt', {session: false}), contoller.update);

module.exports = router;