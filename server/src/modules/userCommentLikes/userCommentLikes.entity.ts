import { Entity, Column, ManyToOne, CreateDateColumn, JoinColumn, PrimaryColumn } from "typeorm";
import { Comment } from "../comments/comment.entity";
import { User } from "../users/user.entity";

@Entity("userCommentLikes")
export class UserCommentLike {
    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    comment_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Comment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'comment_id' })
    comment: Comment;
}