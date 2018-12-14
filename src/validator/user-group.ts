import { checkSchema } from 'express-validator/check';

export const userGroupValidator = checkSchema({
  userId: {
    in: 'body',
    isUUID: {
      errorMessage: 'user id is not a uuid'
    }
  },
  groupId: {
    in: 'body',
    isUUID: {
      errorMessage: 'group id is not a uuid'
    }
  }
});
