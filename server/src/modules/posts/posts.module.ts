import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { UserPostLike } from '../userPostLikes/userPostLikes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, UserPostLike])],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService],
})
export class PostsModule {}