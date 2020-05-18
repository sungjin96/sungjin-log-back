import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Type } from "class-transformer";

@Entity("codes")
export class Code extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  refName!: string;

  @Column("varchar", { length: 500 })
  desc: string;

  @Column({ type: "char", length: 2, default: "Y" })
  useYn!: string;

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
}
