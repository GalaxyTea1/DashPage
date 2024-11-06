import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request);
        return request.user;
    },
);