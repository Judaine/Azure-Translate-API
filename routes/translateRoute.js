const express = require('express');
const controller = require('../controllers/translateController');
const {validateBody, validateResult} = require('../middleware/validator');

const router = express.Router();

/**
 * Example Translation JSON object
 * @typedef {object} TranslateSchema
 * @property {string} text.required - Text to be translated.
 * @property {string} to.required - Translating to language.
 * @property {string} from - Translating from language. If left empty, it will automatically detect the language it is translating from.
 */

/**
 * POST /translate
 * @tags Translate
 * @summary Translates texts by sending JSON body with the text, language to translate to, and optionally the langauge to translate from.
 * @param {TranslateSchema} request.body.required - Translation JSON Object - application/json
 * @return 200 - success response - application/json
 */
router.post('/', validateBody, validateResult, controller.translateText);

//Swagger JSDoc does not support multiple parameters to be passed in path as such.
router.get('/to/:languageTo/:text', controller.translateToParam);

//Swagger JSDoc does not support multiple parameters to be passed in path as such.
router.get('/from/:languageFrom/to/:languageTo/:text', controller.translateToFromParams);

/**
 * GET /translate/languages
 * @tags Translate
 * @summary Returns all available languages that can be translated to/from.
 * @return 200 - success response - application/json
 */
router.get('/languages', controller.languages);

module.exports = router;