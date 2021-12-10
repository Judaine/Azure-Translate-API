const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateBody = [body('text', 'ERROR: Please send valid text no longer than 1000 characters.').isLength({max: 1000}).notEmpty().trim(),
    body('to', 'Please enter a valid langauge to translate to.').isLength({max: 12}).notEmpty().trim().escape(),
    body('from', 'Please enter a valid language to translate from.').isLength({max: 12  }).trim().escape()]; //'from' is not required.

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=>{
            res.status = 400;
            res.send(error.msg);
        });
    } else {
        return next();
    }
};