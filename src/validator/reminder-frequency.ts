import { checkSchema } from 'express-validator/check';

export const reminderFrequencyValidator = checkSchema({
  title: {
    in: 'body',
    isString: {
      errorMessage: 'title must be a string'
    },
    isLength: {
      errorMessage: 'title must be no more than 25 characters long',
      options: { max: 25 }
    }
  },
  frequency: {
    in: 'body',
    isNumeric: {
      errorMessage: 'frequency is NaN'
    }
  }
});
