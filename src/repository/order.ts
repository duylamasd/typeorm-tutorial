import { BaseRepositories } from "../utils";
import { Order } from "../entity";
import { EntityRepository } from "typeorm";

@EntityRepository(Order)
export class OrderRepository extends BaseRepositories.BaseRepository<Order> {

}
