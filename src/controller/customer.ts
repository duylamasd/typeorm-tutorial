import { BaseController } from "../utils";
import { CustomerRepository } from "../repository";
import { SingletonClass, SingletonControllerInstance } from "../decorator";
import { DecoratorMetadataKeys } from "../constant";
import { ObjectType, getManager } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Customer, Order } from "../entity";
import { validate } from "class-validator";

@SingletonClass(DecoratorMetadataKeys.CONTROLLER_INSTANCE)
export class CustomerController extends BaseController<CustomerRepository> {
  @SingletonControllerInstance(CustomerRepository)
  private static instance: CustomerController;

  private constructor(repository: ObjectType<CustomerRepository>) {
    super(repository);
  }

  createWithOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await getManager()
        .transaction("READ UNCOMMITTED", async entityManager => {
          const customer = entityManager.create(Customer, req.body.customer);
          const savedCustomer = await entityManager.save(customer);

          const orders = req.body.orders.map(order => {
            order.customerId = savedCustomer.id;
            return entityManager.create(Order, order);
          });

          savedCustomer.orders = orders;
          await entityManager.save(savedCustomer);

          res.sendStatus(201);
        })
        .catch(e => {
          throw e;
        });
    } catch (e) {
      next(e);
    }
  };
}
