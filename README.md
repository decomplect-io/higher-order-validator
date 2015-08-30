[![Build Status](https://travis-ci.org/decomplect-io/higher-order-validator.svg?branch=master)](https://travis-ci.org/decomplect-io/higher-order-validator)
[![npm version](https://badge.fury.io/js/higher-order-validator.svg)](http://badge.fury.io/js/higher-order-validator)
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

### LICENSE

The MIT License (MIT)

Copyright (c) 2015 Decomplect Software LLP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
