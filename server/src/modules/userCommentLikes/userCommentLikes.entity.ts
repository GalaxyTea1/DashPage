import { Entity, Column, ManyToOne, CreateDateColumn, JoinColumn, PrimaryColumn } from "typeorm";
import { Comment } from "../comments/comment.entity";
import { User } from "../users/user.entity";

@Entity("userCommentLikes")
export class UserCommentLike {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    commentId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'commentId' })
    comment: Comment;
}