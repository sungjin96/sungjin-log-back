import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "./Tag";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 1000 })
  title: string;

  @Column("varchar", { length: 255 })
  write: string;

  @Column("text")
  content: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ type: "char", length: 1, default: "U" })
  authLevel: string;

  @Column({ type: "char", length: 2, default: "Y" })
  useYn!: string;

  // Post(1) <-> Tags(*)
  @OneToMany(() => Tag, (Tag) => Tag.post, { cascade: true, eager: true })
  tags?: Tag[];

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
