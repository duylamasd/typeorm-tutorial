import { checkSchema } from "express-validator/check";

export const messageValidator = checkSchema({
  subject: {
    in: "body",
    isString: {
      errorMessage: "subject must be a string"
    },
    isLength: {
      errorMessage: "subject must be no more than 100 characters long",
      options: { max: 100 }
    }
  },
  creatorId: {
    in: "body",
    isUUID: {
      errorMessage: "creator id is not a uuid"
    }
  },
  body: {
    in: "body",
    isString: {
      errorMessage: "body must be a string"
    }
  },
  parentMessageId: {
    in: "body",
    isUUID: {
      errorMessage: "parent message id is not a uuid"
    }
  },
  expiryDate: {
    in: "body",
    exists: {
      errorMessage: "unknown expiryDate"
    }
  },
  reminderFrequencyId: {
    in: "body",
    isUUID: {
      errorMessage: "reminder frequency id is not a uuid"
    }
  }
});
