import { checkSchema } from 'express-validator/check';

export const groupValidator = checkSchema({
  name: {
    in: 'body',
    exists: {
      errorMessage: 'group name does not exist'
    },
    isString: {
      errorMessage: 'group name is not a string'
    },
    isLength: {
      errorMessage: 'group name should be no more than 50 characters long',
      options: { max: 50 }
    }
  }
});
