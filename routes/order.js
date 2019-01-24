const express = require('express');
const contoller = require('../controllers/order');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), contoller.getAll);
router.post('/register', passport.authenticate('jwt', {session: false}), contoller.create);

module.exports = router;