const {validationResult} = require('express-validator');
const {BadRequest} = require('http-errors');

function validateRequest(req, _res, next) {
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    // @ts-ignore
    next(new BadRequest(errors.array()));
  } else {
    next();
  }
}

/**
 * Function to format validation errors.
 * @param {{msg: string, param: string}} param0 validation error to format
 * @return {string}
 */
function errorFormatter({msg, param}) {
  return `${msg} - ${param}`;
}

module.exports = validateRequest;
