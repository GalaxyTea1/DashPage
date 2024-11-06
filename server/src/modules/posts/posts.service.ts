import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UserPostLike } from '../userPostLikes/userPostLikes.entity';
import { PaginatedPostsResponseDto } from './dto/postResponse.dto';
import { PostWithMeta } from './interfaces/postMeta.interface';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(UserPostLike)
        private userPostLikeRepository: Repository<UserPostLike>,
    ) {}

    async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
        const post = this.postRepository.create({
            ...createPostDto,
            user_id: user.id,
        });
        return this.postRepository.save(post);
    }

    async findAll(page: number = 1, limit: number = 10, currentUser?: User): Promise<PaginatedPostsResponseDto> {
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.likesCount', 'post.userPostLikes')
            .select([
                'post',
                'user.id',
                'user.display_name'
            ])
            .orderBy('post.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);

        if (currentUser) {
            queryBuilder.loadRelationCountAndMap(
                'post.isLiked',
                'post.userPostLikes',
                'like',
                (qb) => qb.where('like.user_id = :userId', { userId: currentUser.id })
            );
        }

        const [posts, total] = await queryBuilder.getManyAndCount();

        const transformedPosts = posts.map(post => ({
            ...post,
            isLiked: post['isLiked'] > 0,
            likesCount: post['likesCount'] || 0
        })) as PostWithMeta[];

        return {
            data: transformedPosts,
            meta: {
                total,
                page,
                lastPage: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string, currentUser?: User): Promise<PostWithMeta> {
        const queryBuilder = this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'commentUser')
            .loadRelationCountAndMap('post.likesCount', 'post.userPostLikes')
            .where('post.id = :id', { id });

        if (currentUser) {
            queryBuilder.loadRelationCountAndMap(
                'post.isLiked',
                'post.userPostLikes',
                'like',
                (qb) => qb.where('like.user_id = :userId', { userId: currentUser.id })
            );
        }

        const post = await queryBuilder.getOne();

        if (!post) {
            throw new NotFoundException(`Post with ID "${id}" not found`);
        }

        return {
            ...post,
            isLiked: post['isLiked'] > 0,
            likesCount: post['likesCount'] || 0
        } as PostWithMeta;
    }

    async toggleLike(postId: string, user: User): Promise<{ isLiked: boolean; likesCount: number }> {
        const post = await this.postRepository.findOneBy({ id: postId });
        if (!post) {
            throw new NotFoundException(`Post with ID "${postId}" not found`);
        }

        const existingLike = await this.userPostLikeRepository.findOne({
            where: {
                post_id: postId,
                user_id: user.id
            }
        });

        if (existingLike) {
            await this.userPostLikeRepository.remove(existingLike);
            const likesCount = await this.userPostLikeRepository.count({
                where: { post_id: postId }
            });
            return { isLiked: false, likesCount };
        } else {
            await this.userPostLikeRepository.save({
                post_id: postId,
                user_id: user.id
            });
            const likesCount = await this.userPostLikeRepository.count({
                where: { post_id: postId }
            });
            return { isLiked: true, likesCount };
        }
    }
}