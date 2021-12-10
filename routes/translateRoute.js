const express = require('express');
const controller = require('../controllers/translateController');
const {validateBody} = require('../middleware/validator');

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
router.post('/', validateBody, controller.translateText);

/**
 * GET /translate/to/:languageTo/:text
 * @tags Translate
 * @summary Translates texts by using parameters instead of JSON body. Auto-detects language to translate from.
 * @param {string} text.query.required - Text to translate
 * @param {string} to.query.required - Language to translate to
 * @return 200 - success response - application/json
 */
router.get('/to/:languageTo/:text', controller.translateToParam);

/**
 * GET /translate/from/:languageFrom/to/:languageTo/:text
 * @tags Translate
 * @summary Translates texts by using parameters instead of JSON body.
 * @param {string} text.query.required - Text to translate
 * @param {string} from.query.required - Language to translate from
 * @param {string} to.query.required - Language to translate to
 * @return 200 - success response - application/json
 */
router.get('/from/:languageFrom/to/:languageTo/:text', controller.translateToFromParams);

/**
 * GET /translate/languages
 * @tags Translate
 * @summary Returns all available languages that can be translated to/from.
 * @return 200 - success response - application/json
 */
router.get('/languages', controller.languages);

module.exports = router;