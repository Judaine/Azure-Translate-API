const express = require('express');
const controller = require('../controllers/translateController');

const router = express.Router();

router.post('/', controller.translateText);

module.exports = router;