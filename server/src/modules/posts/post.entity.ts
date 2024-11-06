import { Entity, PrimaryColumn, BeforeInsert, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";
import { v4 as uuidv4 } from 'uuid';
import { UserPostLike } from "../userPostLikes/userPostLikes.entity";

@Entity("posts")
export class Post {
    @ApiProperty({ description: 'The post ID' })
    @PrimaryColumn("uuid")
    id: string;

    @ApiProperty({ description: 'The user ID who created the post' })
    @Column()
    user_id: string;

    @ApiProperty({ description: 'The post title' })
    @Column()
    title: string;

    @ApiProperty({ description: 'The post content' })
    @Column("text")
    content: string;

    @ApiProperty({ description: 'Post tags' })
    @Column("simple-json", { nullable: true })
    tags: string[];

    @ApiProperty({ description: 'Avatar URLs' })
    @Column("simple-json", { nullable: true })
    avatars: string[];

    @ApiProperty({ description: 'Number of likes' })
    @Column({ default: 0 })
    likes_count: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @OneToMany(() => UserPostLike, userPostLike => userPostLike.post)
    userPostLikes: UserPostLike[];

    @BeforeInsert()
    async beforeInsert() {
    this.id = uuidv4();
  }
}