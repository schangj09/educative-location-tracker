const express = require('express');
const { getOthers, addFriend, getFriendsCsvData } = require('../controllers/friends.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');