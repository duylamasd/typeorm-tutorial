import { checkSchema } from 'express-validator/check';

export const userValidator = checkSchema({
  firstName: {
    in: 'body',
    isString: {
      errorMessage: 'firstName must be a string'
    },
    isLength: {
      errorMessage: 'firstName must be no more than 50 characters long',
      options: { max: 50 }
    }
  },
  middleName: {
    in: 'body',
    isString: {
      errorMessage: 'middleName must be a string'
    },
    isLength: {
      errorMessage: 'middleName must be no more than 50 characters long',
      options: { max: 50 }
    }
  },
  lastName: {
    in: 'body',
    isString: {
      errorMessage: 'lastName must be a string'
    },
    isLength: {
      errorMessage: 'lastName must be no more than 50 characters long',
      options: { max: 50 }
    }
  }
});
