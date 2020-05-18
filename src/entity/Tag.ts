import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Type } from "class-transformer";
import { Post } from "./Post";

@Entity("tags")
export class Tag extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  // Post(1) <-> Tags(*)
  @ManyToOne(() => Post, (Post) => Post.tags, {
    nullable: true,
    onDelete: "CASCADE",
  })
  post: Post;

  @Column("varchar", { length: 50, nullable: true })
  content?: string;

  @Column({type: "char", length: 1, default: "U"})
  authLevel: string;

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
  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
