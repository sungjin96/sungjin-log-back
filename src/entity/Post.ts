import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Type } from "class-transformer";
import { Tag } from "./Tag";

@Entity("Posts")
export class Post extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 1000 })
  title: string;

  @Column("varchar", { length: 255 })
  wirte: string;

  @Column("text")
  content: string;

  @Column()
  type: number;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column()
  authLevel: number;

  @Column({ type: "char", length: 2, default: "Y" })
  useYn!: string;

  // Post(1) <-> Tags(*)
  @OneToMany((type) => Tag, (Tag) => Tag.Post)
  Tags?: Tag[];

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
