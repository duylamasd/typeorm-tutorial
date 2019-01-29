import { BaseEntity } from "../utils";
import { Column, Entity, OneToMany } from "typeorm";
import { Order } from "./order";

@Entity()
export class Customer extends BaseEntity {
  @Column({
    type: "varchar",
    length: 50
  })
  name: string;

  @OneToMany(type => Order, order => order.customer, {
    cascade: ["insert", "update"]
  })
  orders: Promise<Order[]>;
}
