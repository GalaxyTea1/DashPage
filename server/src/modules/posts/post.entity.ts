import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";

@Entity("posts")
export class Post {
    @ApiProperty({ description: 'The post ID' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ description: 'The user ID who created the post' })
    @Column()
    userId: string;

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
    likesCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}