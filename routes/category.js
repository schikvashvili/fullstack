const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const contoller = require('../controllers/category');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), contoller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), contoller.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), contoller.remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), contoller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), contoller.update);

module.exports = router;