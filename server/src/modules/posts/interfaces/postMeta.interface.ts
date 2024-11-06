import { Post } from '../post.entity';

export interface PostWithMeta extends Post {
    isLiked?: boolean;
    likesCount?: number;
}