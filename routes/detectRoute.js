const express = require('express');
const controller = require('../controllers/detectController');
const {validateBody} = require('../middleware/validator');

const router = express.Router();

/**
 * Example Detect JSON object
 * @typedef {object} DetectSchema
 * @property {string} text - Text to be translated.
 */

/**
 * POST /detect
 * @tags Detect
 * @summary Detects the language of text sent in JSON body.
 * @param {DetectSchema} request.body.required - Detect JSON Object - application/json
 * @return 200 - success response - application/json
 */
 router.post('/', validateBody, controller.detectLanguage);

 module.exports = router;