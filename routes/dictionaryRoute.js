const express = require('express');
const controller = require('../controllers/dictionaryController');

const router = express.Router();

/**
 * Example Dictionary Lookup JSON object
 * @typedef {object} DictionaryLookupSchema
 * @property {string} text.required - Word to be looked-up. (Required)
 * @property {string} to.required - Translating to language. (Required)
 * @property {string} from.required - Translating from language. (Required)
 */

/**
 * POST /dictionary/lookup
 * @tags Dictionary
 * @summary Looks up translated word for possible choices.
 * @param {DictionaryLookupSchema} request.body.required - Dictionary Lookup JSON Object - application/json
 * @return 200 - success response - application/json
 */
router.post('/lookup', controller.dictionaryLookup);

module.exports = router;