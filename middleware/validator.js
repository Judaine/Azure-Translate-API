const {body} = require('express-validator');

exports.validateBody = [body('text', 'Please enter valid text.').isLength({max: 800}).notEmpty().trim(),
    body('to', 'Please enter a valid langauge to translate to.').isLength({max: 12}).notEmpty().trim().escape(),
    body('from', 'Please enter a valid language to translate from.').isLength({max: 12  }).trim().escape()]; //'from' is not required.