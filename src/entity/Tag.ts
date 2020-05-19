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

  @Column({ type: "char", length: 1, default: "U" })
  authLevel: string;

  @Column({ type: "char", length: 2, default: "Y" })
  useYn!: string;


  @Column({
    type: "date",
    nullable: false,
    readonly: true,
  })
  createdAt: Date;

  @Column({
    type: "date",
    nullable: true,
    default: () => null,
  })
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
