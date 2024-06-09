const express = require('express');
const {
    addLocation, getLocationCsvData, deleteLocation, editLocation, getUser,
} = require('../controllers/location.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post("/add", authMiddleware, addLocation);

module.exports = router;