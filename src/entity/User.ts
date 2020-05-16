import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  password: string;

  @Column("varchar", { length: 30, nullable: true })
  name?: string;

  @Column({ nullable: true })
  age: number;

  @Column("varchar", { length: 1000, nullable: true })
  introduce?: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
