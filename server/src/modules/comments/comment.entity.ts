import { Entity, PrimaryColumn, BeforeInsert, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Post } from "../posts/post.entity";
import { User } from "../users/user.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity("comments")
export class Comment {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    post_id: string;

    @Column()
    user_id: string;

    @Column("text")
    content: string;

    @Column({ default: false })
    is_anonymous: boolean;

    @Column({ default: 0 })
    likes_count: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @BeforeInsert()
    async beforeInsert() {
        this.id = uuidv4();
    }
}