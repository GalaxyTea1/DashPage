import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {}

    async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
        const post = this.postRepository.create({
            ...createPostDto,
            userId: user.id,
        });
        return this.postRepository.save(post);
    }

    async findAll(page: number = 1, limit: number = 10) {
        const [posts, total] = await this.postRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    displayName: true,
                },
            },
            order: {
                createdAt: 'DESC',
            },
        });

        return {
            data: posts,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['user', 'comments', 'comments.user'],
        });

        if (!post) {
            throw new NotFoundException(`Post with ID "${id}" not found`);
        }

        return post;
    }
}
