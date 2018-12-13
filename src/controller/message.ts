import {
  Request,
  Response,
  NextFunction
} from 'express';
import {
  User,
  Message,
  ReminderFrequency,
  MessageRecipient,
} from '../entity';
import { ObjectType } from 'typeorm';
import { MessageRepository } from '../repository';
import { BaseController } from '../utils';
import { APIQuery, DecoratorMetadataKeys } from '../constant';
import {
  SingletonControllerInstance,
  SingletonClass
} from '../decorator';

/**
 * Message controller
 * @extends BaseController<MessageRepository>
 */
@SingletonClass(DecoratorMetadataKeys.CONTROLLER_INSTANCE)
export class MessageController extends BaseController<MessageRepository> {

  @SingletonControllerInstance(MessageRepository)
  private static instance: MessageController;

  private constructor(repository: ObjectType<MessageRepository>) {
    super(repository);
  }

  isReminder = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.isReminder(id)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }

  getNextRemindDate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getNextRemindDate(id)
      .then((remindDate: Date) => {
        res.json({ remindDate });
      }).catch(e => {
        next(e);
      });
  }

  getExpiryDate = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getExpiryDate(id)
      .then((expiryDate: Date) => {
        res.json({ expiryDate });
      }).catch(e => {
        next(e);
      });
  }

  getCreator = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getCreator(id)
      .then((creator: User) => {
        res.json(creator);
      }).catch(e => {
        next(e);
      });
  }

  getReminderFrequency = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getReminderFrequency(id)
      .then((reminderFrequency: ReminderFrequency) => {
        res.json(reminderFrequency);
      }).catch(e => {
        next(e);
      });
  }

  getMessageRecipients = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getMessageRecipients(id, skip, limit)
      .then((messageRecipients: MessageRecipient[]) => {
        res.json(messageRecipients);
      }).catch(e => {
        next(e);
      });
  }

  getParentMessage = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.getParentMessage(id)
      .then((message: Message) => {
        res.json(message);
      }).catch(e => {
        next(e);
      });
  }

  getChildMessages = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getChildMessages(id, skip, limit)
      .then((children: Message[]) => {
        res.json(children);
      }).catch(e => {
        next(e);
      });
  }
}
