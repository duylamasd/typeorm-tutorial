import {
  Request,
  Response,
  NextFunction
} from 'express';
import { ObjectType } from 'typeorm';
import { ReminderFrequencyRepository } from '../repository';
import { BaseController } from '../utils';
import { APIQuery } from '../constant';
import { ReminderFrequency, Message } from '../entity';

/**
 * Reminder frequency controller
 * @extends BaseController<ReminderFrequencyRepository>
 */
export class ReminderFrequencyController extends BaseController<ReminderFrequencyRepository> {

  private static instance: ReminderFrequencyController;

  private constructor(repository: ObjectType<ReminderFrequencyRepository>) {
    super(repository);
  }

  public static getInstance(): ReminderFrequencyController {
    if (!this.instance) {
      this.instance = new ReminderFrequencyController(ReminderFrequencyRepository);
    }

    return this.instance;
  }

  findByTitle = (req: Request, res: Response, next: NextFunction) => {
    let title = req.params['title'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.findByTitle(title, skip, limit)
      .then((rows: ReminderFrequency[]) => {
        res.json(rows);
      }).catch(e => {
        next(e);
      });
  }

  isActive = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];

    this.repository.isActive(id)
      .then((status: boolean) => {
        res.json({ status });
      }).catch(e => {
        next(e);
      });
  }

  getMessages = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    let skip = req.query[APIQuery.SKIP];
    let limit = req.query[APIQuery.LIMIT];

    this.repository.getMessages(id, skip, limit)
      .then((messages: Message[]) => {
        res.json(messages);
      }).catch(e => {
        next(e);
      });
  }
}
