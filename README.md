[![Build Status](https://travis-ci.org/decomplect-io/higher-order-validator.svg?branch=master)](https://travis-ci.org/decomplect-io/higher-order-validator)
# higher-order-validator

A Javascript library that provides a `Validated` wrapper. You can wrap it around any object to automatically
get schema validation. Uses [Validate.js](http://validatejs.org/) and [Moment.js](http://momentjs.com/) under the hood.

Inspired by [React higher order components](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775).

# Details

The wrapper `Validated` adds a single method to the wrapped class -
 `validate(constraints, [options])` - The object is validated based on the supplied constraints and passed in optional Validate.js [configuration](http://validatejs.org/#validate).

# Usage

`npm install higher-order-validator --save`

Let's say you have a class like so -

```javascript
class Test {
  constructor(opts = {}) {
    this.id = opts.id;
    this.duration = opts.duration;
  }
}
```

Optionally create a `constraints()` method. Note that constraints are just data and can be passed in from anywhere -

```javascript
constraints() {
  return {
    id: {
      presence: true,
    },
    duration: {
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 30,
      },
    },
  };
}
```
These constraints are from [Validate.js](http://validatejs.org/).

Finally wrap it with the `Validated` function -

```javascript
import validated from 'higher-order-validator';

class Test {
  constructor(opts = {}) {
    this.id = opts.id;
    this.duration = opts.duration;
  }

  constraints() {
    return {
      id: {
        presence: true,
      },
      duration: {
        numericality: {
          onlyInteger: true,
          greaterThan: 0,
          lessThanOrEqualTo: 30,
        },
      },
    };
  }
}

export default validated(Test);
```

Now you can call the validate method to trigger validations -

```javascript
import Test from 'test';

const test = new Test({ id: '1'});
const errors = test.validate(test.constraints());
errors ==== { duration: ['must be less than or equal to 30'] };
```
