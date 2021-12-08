const express = require('express');
const controller = require('../controllers/translateController');

const router = express.Router();

router.post('/', controller.translateText);

router.get('/languages', controller.languages);

module.exports = router;