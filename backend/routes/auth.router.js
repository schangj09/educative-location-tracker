const express = require('express');
const { signup, signin, authenticate } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/authenticate', authMiddleware, authenticate);

module.exports = router;
