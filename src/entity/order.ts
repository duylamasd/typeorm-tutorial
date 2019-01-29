import { BaseEntity } from "../utils";
import { Column, Entity, ManyToOne, JoinColumn, Index } from "typeorm";
import { Customer } from "./customer";

@Entity()
@Index("ORDER_001", ["customerId"])
export class Order extends BaseEntity {
  @Column({
    type: "varchar",
    length: 50
  })
  name: string;

  @Column({
    type: "uuid"
  })
  customerId: string;

  @ManyToOne(type => Customer, customer => customer.orders)
  @JoinColumn({
    referencedColumnName: "id",
    name: "customerId"
  })
  customer: Promise<Customer>;
}
