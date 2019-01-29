import { BaseRepositories } from "../utils";
import { Customer } from "../entity";
import { EntityRepository } from "typeorm";

@EntityRepository(Customer)
export class CustomerRepository extends BaseRepositories.BaseRepository<Customer> {

}
