import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Type } from "class-transformer";

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

  @Column({type: "char", length: 1, default: "U"})
  authLevel: string;

  @Column("varchar", { length: 1000, nullable: true })
  introduce?: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({
    type: "int",
    width: 11,
    nullable: false,
    readonly: true,
    default: () => "0",
    transformer: {
      to: (value?: Date) =>
        !value ? value : Math.round(value.getTime() / 1000),
      from: (value?: number) => (!value ? value : new Date(value * 1000)),
    },
  })
  @Type(() => Date)
  createdAt: Date;

  @Column({
    type: "int",
    width: 11,
    nullable: true,
    default: () => null,
    transformer: {
      to: (value?: Date) =>
        !value ? value : Math.round(value.getTime() / 1000),
      from: (value?: number) => (!value ? value : new Date(value * 1000)),
    },
  })
  @Type(() => Date)
  updatedAt?: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
