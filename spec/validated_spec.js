import { expect } from 'chai';
import validated from '../src/validated';

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
const ValidatedTest = validated(Test);

describe('Validated', () => {
  it('allows validating classes by passing in constraints', () => {
    const validatedTest = new ValidatedTest({ duration: 998 });
    const errors = validatedTest.validate(validatedTest.constraints());
    expect(errors).to.be.eql({
      duration: ['must be less than or equal to 30'],
      id: ["can't be blank"],
    });
  });

  it('returns no errors if the object is fully valid', () => {
    const validatedTest = new ValidatedTest({ duration: 1, id: '123' });
    const errors = validatedTest.validate(validatedTest.constraints());
    expect(errors).to.be.eql(undefined);
  });

  it('allows customatization of the validator options', () => {
    const validatedTest = new ValidatedTest({ duration: 998 });
    const errors = validatedTest.validate(validatedTest.constraints(), { fullMessages: true });
    expect(errors).to.be.eql({
      duration: ['Duration must be less than or equal to 30'],
      id: ["Id can't be blank"],
    });
  });

  it('does not fail if passed with empty/undefined constraints', () => {
    const validatedTest = new ValidatedTest({ duration: 998 });
    const errors = validatedTest.validate();
    expect(errors).to.be.eql(undefined);
  });
});
