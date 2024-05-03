const express = require('express');
const { autocomplete } = require('../controllers/autocomplete.controller');

const router = express.Router();
router.get('/:searchKey', autocomplete);

module.exports = router;
