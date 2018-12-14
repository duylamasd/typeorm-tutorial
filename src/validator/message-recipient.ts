import { checkSchema } from 'express-validator/check';

export const messageRecipientValidator = checkSchema({
  recipientId: {
    in: 'body',
    isUUID: {
      errorMessage: 'recipient id is not a uuid'
    }
  },
  recipientGroupId: {
    in: 'body',
    isUUID: {
      errorMessage: 'recipient id is not a uuid'
    }
  },
  messageId: {
    in: 'body',
    isUUID: {
      errorMessage: 'recipient id is not a uuid'
    }
  }
});
