import { hash } from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Comment } from "../comments/comment.entity";
import { Post } from "../posts/post.entity";

@Entity("users")
export class User {
    @PrimaryColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    display_name: string;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({ nullable: true })
    reset_password_token: string;

    @Column({ nullable: true })
    reset_password_expires: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @BeforeInsert()
    async beforeInsert() {
    if (!this.password) {
        throw new Error('Password is required');
    }
    
    this.id = uuidv4();
    this.password = await hash(this.password, 10);
  }
}