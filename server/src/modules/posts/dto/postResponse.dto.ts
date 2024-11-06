import { PostWithMeta } from "../interfaces/postMeta.interface";

export class PaginatedPostsResponseDto {
    data: PostWithMeta[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
    };
}