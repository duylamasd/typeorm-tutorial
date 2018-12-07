import {
  Request,
  Response,
  NextFunction
} from 'express';
import {
  getConnection,
  ObjectType,
  Repository,
  DeleteResult
} from 'typeorm';
import HttpStatus from 'http-status-codes';

/**
 * Base controller
 */
export abstract class BaseController<T extends Repository<any>> {
  protected repository: T;

  /**
   * Base controller constructor
   * @param repository The repository
   */
  constructor(repository: ObjectType<T>) {
    this.repository = getConnection().getCustomRepository<T>(repository);
  }

  create = (req: Request, res: Response, next: NextFunction) => {
    let newEntity = this.repository.create(req.body);
    this.repository.save(newEntity).then(entity => {
      res.status(HttpStatus.CREATED).json(entity);
    }).catch(e => {
      next(e);
    });
  }

  find = (req: Request, res: Response, next: NextFunction) => {
    let filter = req.query['$filter'];
    let skip = req.query['$skip'];
    let limit = req.query['$limit'];
    this.repository.find({
      where: filter,
      skip: skip,
      take: limit
    }).then((entities: any[]) => {
      res.json(entities);
    }).catch(e => {
      next(e);
    });
  }

  findById = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.findOne(id)
      .then(row => {
        res.json(row);
      }).catch(e => {
        next(e);
      });
  }

  deleteById = (req: Request, res: Response, next: NextFunction) => {
    let id = req.params['id'];
    this.repository.delete(id)
      .then((result: DeleteResult) => {
        res.json(result);
      }).catch(e => {
        next(e);
      });
  }
}
