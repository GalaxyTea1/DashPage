import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/decorators/getUser.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'Post created successfully' })
    create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
        console.log("post controller");
        return this.postsService.create(createPostDto, user);
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiResponse({ status: 200, description: 'Return all posts' })
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.postsService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get post by id' })
    @ApiResponse({ status: 200, description: 'Return post by id' })
    @ApiResponse({ status: 404, description: 'Post not found' })
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Post(':id/like')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Toggle like on post' })
    @ApiResponse({ status: 200, description: 'Like status toggled successfully' })
    async toggleLike(@Param('id') id: string, @GetUser() user: User) {
        return this.postsService.toggleLike(id, user);
    }
}