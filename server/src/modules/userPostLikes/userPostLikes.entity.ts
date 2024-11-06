import { Entity, Column, ManyToOne, CreateDateColumn, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";

@Entity("userPostLikes")
export class UserPostLike {
    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    post_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;
}