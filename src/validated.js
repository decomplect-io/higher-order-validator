const _validate = require('validate.js');
const moment = require('moment');
const merge = require('lodash.merge');

_validate.moment = moment;

function validated(Klass) {
  // validates the object with the given constraints and optional Validate.js [options](http://validatejs.org/#validate)
  Klass.prototype.validate = function(constraints = {}, opts = {}) {
    // Converts `this` into a literal with all methods/functions removed. Needed for Validate.js.
    const toLiteral = () => {
      const allProperties = () => {
        const excludedProps = ['caller', 'callee', 'arguments'];
        return Object.getOwnPropertyNames(this).filter(prop => {
          return excludedProps.indexOf(prop) === -1 && typeof this[prop] !== 'function';
        });
      };
      return allProperties().reduce((memo, prop) => {
        memo[prop] = this[prop];
        return memo;
      }, {});
    };

    const defaultOpts = { format: 'grouped', fullMessages: false };
    const options = merge(defaultOpts, opts);
    return _validate(toLiteral(), constraints, options);
  };

  return Klass;
}

export default validated;
