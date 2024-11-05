import { Entity, Column, ManyToOne, CreateDateColumn, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";

@Entity("userPostLikes")
export class UserPostLike {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    postId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Post, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'postId' })
    post: Post;
}